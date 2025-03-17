// instrumentation.node.ts 
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

function parseOtlpHeaders(headerString: string): Record<string, string> {
    return headerString.split(',')
        .map(pair => pair.trim())
        .reduce((headers, pair) => {
            const [key, value] = pair.split('=');
            if (key && value) {
                headers[key.trim()] = value.trim();
            }
            return headers;
        }, {} as Record<string, string>);
}

const otlpEndpoint = `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`;

const additionalHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS
    ? parseOtlpHeaders(process.env.OTEL_EXPORTER_OTLP_HEADERS)
    : {};

const exporterHeaders = {
    'Content-Type': 'application/x-protobuf',
    ...additionalHeaders
};

const exporter = new OTLPTraceExporter({
    url: otlpEndpoint,
    headers: exporterHeaders
});

const sdk = new NodeSDK({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'frontend'
    }),
    spanProcessors: [new SimpleSpanProcessor(exporter)]
});

sdk.start();
