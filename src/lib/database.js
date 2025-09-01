import pkg from 'pg';
const { Pool } = pkg;

// Configuração da conexão com PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'bruna',
  host: process.env.DB_HOST || '72.60.68.33',
  database: process.env.DB_NAME || 'escola',
  password: process.env.DB_PASSWORD || '32080910@Eu',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Tratamento de eventos do pool
pool.on('connect', () => {
  console.log('Nova conexão estabelecida com o PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool de conexões:', err);
  // O ideal é não dar exit -1 em produção, mas para o script de teste está ok.
  // Em produção, um tratamento de erro mais robusto é recomendado.
  process.exit(1); 
});

// Função para testar a conexão
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Erro ao conectar com PostgreSQL:', err);
    return false;
  }
};

// Função para executar queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Query executada em ${duration}ms: ${text.split('\n')[0]}...`);
    return res;
  } catch (err) {
    console.error('Erro na query:', err);
    throw err;
  }
};

// Exporte as funções para que outros arquivos possam importá-las
export { testConnection, query, pool };

// Se o seu `test-db.mjs` precisar da função `getClient`, você pode adicioná-la aqui e exportá-la também.
// No entanto, para o script de teste que você mostrou, `testConnection` e `query` são suficientes.