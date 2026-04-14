using System.ComponentModel.DataAnnotations;
using maxiprod.Enums;

namespace maxiprod.Application.DTOs.Transacao;

public class TransacaoRequestDto
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [MaxLength(400, ErrorMessage = "A descrição não pode exceder 400 caracteres")]
    public string Descricao { get; set; } = string.Empty;
    
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "A quantidade deve ser maior que 0.")]
    public decimal Valor { get; set; }
    
    [Required]
    public TipoTransacao Tipo  { get; set; }
    
    [Required]
    public Guid CategoriaId { get; set; }
    
    [Required]
    public Guid PessoaId { get; set; }
}