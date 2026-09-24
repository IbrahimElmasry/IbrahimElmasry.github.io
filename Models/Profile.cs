namespace PortfolioApp.Models;

public sealed class Profile
{
    public string Name { get; set; } = "";
    public string Title { get; set; } = "";
    public string Summary { get; set; } = "";
    public string Location { get; set; } = "";
    public bool Available { get; set; }
    public string GithubUrl { get; set; } = "";
    public string LinkedInUrl { get; set; } = "";
    public string WhatsAppUrl { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string SecondaryPhone { get; set; } = "";
    public string ResumeUrl { get; set; } = "";
    public string FormspreeEndpoint { get; set; } = "";
}
