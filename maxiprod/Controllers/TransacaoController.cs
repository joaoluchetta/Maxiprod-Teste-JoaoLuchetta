using maxiprod.Application.DTOs.Transacao;
using maxiprod.Data;
using maxiprod.Enums;
using maxiprod.Models;
using Microsoft.AspNetCore.Mvc;

namespace maxiprod.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public TransacaoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostTransacao(TransacaoRequestDto request)
    {
        var pessoa = await _context.Pessoas.FindAsync(request.PessoaId);
        if (pessoa == null) return NotFound("Pessoa não encontrada.");

        if (pessoa.Idade < 18 && request.Tipo == TipoTransacao.Receita)
        {
            return BadRequest("Menores de 18 anos só podem registrar despesas.");
        }
        
        var categoria = await _context.Categorias.FindAsync(request.CategoriaId);
        if (categoria == null) return NotFound("Categoria não encontrada.");
        
        if (categoria.Finalidade != FinalidadeCategoria.Ambas && 
            (int)categoria.Finalidade != (int)request.Tipo)
        {
            return BadRequest($"Esta categoria é exclusiva para {categoria.Finalidade} e não aceita {request.Tipo}.");
        }

        var transacao = new Transacao
        {
            Descricao = request.Descricao,
            Valor = request.Valor,
            Tipo = request.Tipo,
            CategoriaId = request.CategoriaId,
            PessoaId = request.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Transação realizada com sucesso!", Id = transacao.Id });
    }
}