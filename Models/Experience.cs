namespace PortfolioApp.Models;

public sealed class Experience
{
    public string Type { get; set; } = "Experience";
    public string Role { get; set; } = "";
    public string Company { get; set; } = "";
    public string Period { get; set; } = "";
    public string Location { get; set; } = "";
    public string[] Highlights { get; set; } = [];
    public string[] Technologies { get; set; } = [];
}
