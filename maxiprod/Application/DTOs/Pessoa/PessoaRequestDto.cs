using System.ComponentModel.DataAnnotations;

namespace maxiprod.DTOs.Pessoa;

public class PessoaRequestDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(200, ErrorMessage = "Nome deve ter no máximo 200 caracteres.")]
    public string Nome { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "A idade é obrigatória.")]
    [Range(18,110, ErrorMessage = "A idade deve ser maior que dezoito.")]
    public int Idade { get; set; }
}