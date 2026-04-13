namespace maxiprod.DTOs.Pessoa;

public class PessoaResponseDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public int Idade { get; set; }
    
    // Campos dos totais por pessoa
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}