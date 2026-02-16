var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => Results.Content("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App</title>
        <style>
            body { font-family: system-ui, sans-serif; max-width: 600px; margin: 2rem auto; text-align: center; }
            h1 { font-size: 2.5rem; }
            p { color: #666; }
        </style>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>Welcome to your new ASP.NET app.</p>
    </body>
    </html>
    """, "text/html"));

app.MapGet("/health", () => new { status = "healthy" });

app.Run();
