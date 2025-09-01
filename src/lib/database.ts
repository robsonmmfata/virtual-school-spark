import { Pool } from 'pg';

// Configuração da conexão com PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'bruna',
  host: process.env.DB_HOST || 'your-vps-hostname-or-ip',
  database: process.env.DB_NAME || 'escola',
  password: process.env.DB_PASSWORD || '32080910@Eu',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, // Máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo limite para conexões ociosas
  connectionTimeoutMillis: 2000, // Tempo limite para estabelecer conexão
});

// Tratamento de eventos do pool
pool.on('connect', (client) => {
  console.log('Nova conexão estabelecida com o PostgreSQL');
});

pool.on('error', (err, client) => {
  console.error('Erro inesperado no pool de conexões:', err);
  process.exit(-1);
});

// Função para testar a conexão
export const testConnection = async (): Promise<boolean> => {
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
export const query = async (text: string, params?: (string | number | boolean | null)[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query executada em', duration, 'ms:', text);
    return res;
  } catch (err) {
    console.error('Erro na query:', err);
    throw err;
  }
};

// Função para obter um cliente do pool
export const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  // Monkey patch para logging
  client.query = (...args) => {
    const start = Date.now();
    return query.apply(client, args).then(res => {
      const duration = Date.now() - start;
      console.log('Query executada em', duration, 'ms');
      return res;
    });
  };

  client.release = () => {
    release.apply(client);
  };

  return client;
};

export default pool;
