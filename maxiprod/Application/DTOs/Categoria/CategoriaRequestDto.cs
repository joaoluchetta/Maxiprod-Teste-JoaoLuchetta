using System.ComponentModel.DataAnnotations;
using maxiprod.Enums;

namespace maxiprod.Application.DTOs.Categoria;

public class CategoriaRequestDto
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [MaxLength(400, ErrorMessage = "A descrição não pode exceder 400 caracteres.")]
    public string Descricao { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "A finalidade é obrigatória.")]
    public FinalidadeCategoria Finalidade { get; set; }
}