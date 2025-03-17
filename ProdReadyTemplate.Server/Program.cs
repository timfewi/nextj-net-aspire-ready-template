var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddProblemDetails();

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// CORS-Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientOrigin",
        policy =>
        {
            policy.WithOrigins("https://frontend")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});



var app = builder.Build();

app.UseCors("ClientOrigin");

app.MapDefaultEndpoints();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.MapFallbackToFile("/page.tsx");

app.Run();
