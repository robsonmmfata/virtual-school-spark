import { testConnection, query } from './database';

async function testDatabaseConnection() {
  console.log('🔄 Testando conexão com o banco de dados...');

  // Testa a conexão básica
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ Falha na conexão com o banco');
    return;
  }

  try {
    // Testa uma query simples
    console.log('\n🔄 Testando query básica...');
    const result = await query('SELECT NOW() as current_time');
    console.log('✅ Query executada com sucesso:', result.rows[0]);

    // Testa consulta de usuários
    console.log('\n🔄 Testando consulta de usuários...');
    const users = await query('SELECT id, email, tipo FROM usuarios LIMIT 5');
    console.log('✅ Usuários encontrados:', users.rows.length);
    users.rows.forEach(user => {
      console.log(`  - ${user.email} (${user.tipo})`);
    });

    // Testa consulta de alunos
    console.log('\n🔄 Testando consulta de alunos...');
    const alunos = await query(`
      SELECT a.nome, a.matricula, t.nome as turma
      FROM alunos a
      JOIN alunos_turmas at ON a.id = at.aluno_id
      JOIN turmas t ON at.turma_id = t.id
      LIMIT 3
    `);
    console.log('✅ Alunos encontrados:', alunos.rows.length);
    alunos.rows.forEach(aluno => {
      console.log(`  - ${aluno.nome} (${aluno.matricula}) - Turma: ${aluno.turma}`);
    });

    console.log('\n🎉 Todos os testes passaram! Banco de dados funcionando corretamente.');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  }
}

// Executa o teste se o arquivo for executado diretamente
if (require.main === module) {
  testDatabaseConnection()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Erro fatal:', err);
      process.exit(1);
    });
}

export { testDatabaseConnection };
