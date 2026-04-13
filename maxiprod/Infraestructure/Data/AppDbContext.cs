using maxiprod.Models;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configuração para Delete em cascata
        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configuração de precisão para os valores menetários
        modelBuilder.Entity<Transacao>()
            .Property(t => t.Valor)
            .HasPrecision(18, 2);
    }
}