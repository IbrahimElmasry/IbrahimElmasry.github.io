using System.Net.Http.Json;
using System.Text.Json;
using PortfolioApp.Models;

namespace PortfolioApp.Services;

public sealed class ContentService(HttpClient http, Microsoft.AspNetCore.Components.NavigationManager navigation)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { WriteIndented = true };
    public Task<List<Project>> GetProjectsAsync() => ReadAsync<List<Project>>("data/projects.json?v=20260924-4");
    public Task<List<Experience>> GetExperienceAsync() => ReadAsync<List<Experience>>("data/experience.json");
    public Task<List<Skill>> GetSkillsAsync() => ReadAsync<List<Skill>>("data/skills.json");
    public Task<Profile> GetProfileAsync() => ReadAsync<Profile>("data/profile.json?v=20260925-1");
    public Task<List<ServiceItem>> GetServicesAsync() => ReadAsync<List<ServiceItem>>("data/services.json");
    public Task<List<FaqItem>> GetFaqsAsync() => ReadAsync<List<FaqItem>>("data/faqs.json");
    public Task<List<ProcessStep>> GetProcessStepsAsync() => ReadAsync<List<ProcessStep>>("data/process.json");
    public Task<List<Testimonial>> GetTestimonialsAsync() => ReadAsync<List<Testimonial>>("data/testimonials.json");
    public Task<string> GetRawAsync(string path) => http.GetStringAsync(new Uri(new Uri(navigation.BaseUri), path).ToString());
    public string Serialize<T>(T value) => JsonSerializer.Serialize(value, JsonOptions);

    private async Task<T> ReadAsync<T>(string path)
    {
        try { return await http.GetFromJsonAsync<T>(new Uri(new Uri(navigation.BaseUri), path).ToString()) ?? Activator.CreateInstance<T>()!; }
        catch (HttpRequestException) { return Activator.CreateInstance<T>()!; }
        catch (JsonException) { return Activator.CreateInstance<T>()!; }
    }
}
