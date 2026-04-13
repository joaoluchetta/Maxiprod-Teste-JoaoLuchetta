using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using maxiprod.Enums;

namespace maxiprod.Models;

public class Transacao
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(400)]
    public string Descricao { get; set; }
    
    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Valor { get; set; }
    
    [Required]
    public TipoTransacao Tipo { get; set; }
    
    [Required]
    public Guid CategoriaId { get; set; }
    [ForeignKey(nameof(CategoriaId))]
    public Categoria Categoria { get; set; }
    
    [Required]
    public Guid PessoaId { get; set; }
    [ForeignKey(nameof(PessoaId))]
    public Pessoa Pessoa { get; set; }
    
}