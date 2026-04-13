using maxiprod.Data;
using maxiprod.DTOs.Pessoa;
using maxiprod.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoaController(AppDbContext context)
    {
        _context = context;
    }

    //GET: api/pessoas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaResponseDto>>> GetPessoas()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .Select(p => new PessoaResponseDto()
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade,
                TotalReceitas = p.Transacoes.Where(t => t.Tipo == Enums.TipoTransacao.Receita).Sum(t => t.Valor),
                TotalDespesas = p.Transacoes.Where(t => t.Tipo == Enums.TipoTransacao.Despesa).Sum(t => t.Valor),
                Saldo = p.Transacoes.Where(t => t.Tipo == Enums.TipoTransacao.Receita).Sum(t => t.Valor) -
                        p.Transacoes.Where(t => t.Tipo == Enums.TipoTransacao.Despesa).Sum(t => t.Valor)
            })
            .ToListAsync<PessoaResponseDto>();
        
        return Ok(pessoas);
    }
    
    // POST: api/pessoas
    [HttpPost]
    public async Task<ActionResult<Pessoa>> PostPessoa(PessoaRequestDto dto)
    {
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
    }
    
    // DELETE: api/pessoas/{id} 
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePessoa(Guid id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa == null) return NotFound();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}