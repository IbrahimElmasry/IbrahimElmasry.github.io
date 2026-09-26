namespace PortfolioApp.Models;

public sealed class Certificate
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Issuer { get; set; } = "";
    public string IssuerCode { get; set; } = ""; // "google", "udemy", "hp", "depi"
    public string Category { get; set; } = "";
    public string IssueDate { get; set; } = "";
    public string CredentialId { get; set; } = "";
    public string VerificationUrl { get; set; } = "";
    public string SecondaryVerificationUrl { get; set; } = "";
    public string PdfUrl { get; set; } = "";
    public string Description { get; set; } = "";
    public List<string> Skills { get; set; } = [];
    public bool Featured { get; set; }
}
