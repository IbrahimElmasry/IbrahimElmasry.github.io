namespace PortfolioApp.Models;

public sealed class Project
{
    public string Title { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Description { get; set; } = "";
    public string Period { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public string ImageAlt { get; set; } = "";
    public string Architecture { get; set; } = "";
    public string[] Tags { get; set; } = [];
    public string[] TechStack { get; set; } = [];
    public string GithubUrl { get; set; } = "";
    public string DemoUrl { get; set; } = "";
    public bool Featured { get; set; }
}
