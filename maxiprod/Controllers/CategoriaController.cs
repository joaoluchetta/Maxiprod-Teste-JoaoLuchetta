using maxiprod.Application.DTOs.Categoria;
using maxiprod.Data;
using maxiprod.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaResponseDto>>> GetCategorias()
    {
        return await _context.Categorias
            .Select(c => new CategoriaResponseDto
            {
                Id = c.Id,
                Descricao = c.Descricao,
                Finalidade = c.Finalidade
            }).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<CategoriaResponseDto>> PostCategoria(CategoriaRequestDto request)
    {
        var categoria = new Categoria
        {
            Descricao = request.Descricao,
            Finalidade = request.Finalidade
        };

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        var response = new CategoriaResponseDto 
        { 
            Id = categoria.Id, 
            Descricao = categoria.Descricao, 
            Finalidade = categoria.Finalidade 
        };

        return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Id }, response);
    }  
}