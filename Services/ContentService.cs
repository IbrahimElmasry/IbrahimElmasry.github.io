using System.Net.Http.Json;
using System.Text.Json;
using PortfolioApp.Models;

namespace PortfolioApp.Services;

public sealed class ContentService(HttpClient http, Microsoft.AspNetCore.Components.NavigationManager navigation)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { WriteIndented = true };
    public Task<List<Project>> GetProjectsAsync() => ReadAsync<List<Project>>("data/projects.json?v=20260928-1");
    public Task<List<Experience>> GetExperienceAsync() => ReadAsync<List<Experience>>("data/experience.json?v=20260927-1");
    public Task<List<Skill>> GetSkillsAsync() => ReadAsync<List<Skill>>("data/skills.json?v=20260927-1");
    public Task<Profile> GetProfileAsync() => ReadAsync<Profile>("data/profile.json?v=20260927-1");
    public Task<List<ServiceItem>> GetServicesAsync() => ReadAsync<List<ServiceItem>>("data/services.json?v=20260927-1");
    public Task<List<FaqItem>> GetFaqsAsync() => ReadAsync<List<FaqItem>>("data/faqs.json?v=20260927-1");
    public Task<List<ProcessStep>> GetProcessStepsAsync() => ReadAsync<List<ProcessStep>>("data/process.json?v=20260927-1");
    public Task<List<Testimonial>> GetTestimonialsAsync() => ReadAsync<List<Testimonial>>("data/testimonials.json?v=20260927-1");
    public Task<List<Certificate>> GetCertificatesAsync() => ReadAsync<List<Certificate>>("data/certificates.json?v=20260927-1");
    public Task<List<ArticleItem>> GetArticlesAsync() => ReadAsync<List<ArticleItem>>("data/articles.json?v=20261007-1");
    public Task<string> GetRawAsync(string path) => http.GetStringAsync(new Uri(new Uri(navigation.BaseUri), path).ToString());
    public string Serialize<T>(T value) => JsonSerializer.Serialize(value, JsonOptions);

    private async Task<T> ReadAsync<T>(string path)
    {
        try { return await http.GetFromJsonAsync<T>(new Uri(new Uri(navigation.BaseUri), path).ToString()) ?? Activator.CreateInstance<T>()!; }
        catch (HttpRequestException) { return Activator.CreateInstance<T>()!; }
        catch (JsonException) { return Activator.CreateInstance<T>()!; }
    }
}
