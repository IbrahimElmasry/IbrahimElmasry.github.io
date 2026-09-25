namespace PortfolioApp.Models;

public sealed class ServiceItem
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string[] Capabilities { get; set; } = [];
    public string ProjectSlug { get; set; } = "";
    public string ProjectTitle { get; set; } = "";
    public string Icon { get; set; } = "✳";
}
