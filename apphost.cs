#:package Aspire.Hosting.Azure.Redis@13.0.0
#:package Aspire.Hosting.Docker@13.0.0-preview.1.25560.3
#:package Aspire.Hosting.JavaScript@13.0.0
#:sdk Aspire.AppHost.Sdk@13.0.0

var builder = DistributedApplication.CreateBuilder(args);

builder.AddDockerComposeEnvironment("dc");

var apiService = builder.AddProject("apiservice", "./ApiService")
    .WithExternalHttpEndpoints();

var viteApp = builder.AddViteApp("frontend", "./frontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService);

var redis = builder.AddAzureRedis("redis");

#pragma warning disable ASPIREPIPELINES001
#pragma warning disable ASPIREPIPELINES004

builder.Pipeline.AddStep("validate-deployment", async context =>
{
   
   context.Logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, 100, $"Environment Process: {Environment.CurrentDirectory}", null, (s, e) => s.ToString());

    
}, dependsOn: "docker-compose-up-dc");


builder.Build().Run();
