using System.ComponentModel.DataAnnotations;
using maxiprod.Enums;

namespace maxiprod.Models;

public class Categoria
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(400)]
    public string Descricao  { get; set; }
    
    [Required]
    public FinalidadeCategoria Finalidade { get; set; }
}