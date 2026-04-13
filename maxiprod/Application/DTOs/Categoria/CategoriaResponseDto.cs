using maxiprod.Enums;

namespace maxiprod.Application.DTOs.Categoria;

public class CategoriaResponseDto
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
}