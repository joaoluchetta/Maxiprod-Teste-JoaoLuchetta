using System.ComponentModel.DataAnnotations;

namespace maxiprod.Models;

public class Pessoa
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; }
    
    [Required]
    public int Idade { get; set; }
    
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}