var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var landingPage = File.ReadAllText("landing.html");

app.MapGet("/", () => Results.Content(landingPage, "text/html"));

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();
