using System;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;

namespace TeamLunch.Tests;

public abstract class TestDataContextBase : IDisposable
{
    protected readonly DbConnection _connection;
    protected readonly DbContextOptions<DataContext> _contextOptions;

    protected DataContext _stubContext;

    public TestDataContextBase()
    {
        _connection = new SqliteConnection("Filename=:memory:");
        _connection.Open();

        _contextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseSqlite(_connection)
            .Options;

        using var context = new DataContext(_contextOptions);
        context.Database.EnsureCreated();
    }

    public void Dispose() => _connection.Dispose();

}