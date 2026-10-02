/**
 * Seed script: creates a demo user, two services and two tokens.
 *
 * Safe to run more than once: it uses findOrCreate, so existing rows are
 * left untouched. Run it after the database is created:
 *
 *   npm run seed
 */
require('dotenv').config();

const { sequelize } = require('./config/db');
const User = require('./models/user.model');
const Service = require('./models/service.model');
const Token = require('./models/token.model');

const DEMO_USER = {
  name: 'Martha Caro',
  email: 'martha@coro.com',
  password: '123456',
  role: 'admin'
};

const DEMO_SERVICES = [
  { name: 'Gmail', description: 'Servicio de correo electronico' },
  { name: 'GitHub', description: 'Plataforma de desarrollo y repositorios' }
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const [user, created] = await User.findOrCreate({
      where: { email: DEMO_USER.email },
      defaults: DEMO_USER
    });
    console.log(
      created ? `Usuario creado: ${user.email}` : `Usuario ya existía: ${user.email}`
    );

    const services = [];
    for (const service of DEMO_SERVICES) {
      const [row, serviceCreated] = await Service.findOrCreate({
        where: { name: service.name },
        defaults: service
      });
      if (serviceCreated) console.log(`Servicio creado: ${row.name}`);
      services.push(row);
    }

    const [firstService, secondService] = services;
    const existingTokens = await Token.count({ where: { user_id: user.id } });

    if (existingTokens === 0 && firstService && secondService) {
      await Token.bulkCreate([
        {
          value_token: 'tok_live_9f3a2c8e1b7d4a6f',
          creation_date: '2026-09-15T10:00:00Z',
          expiration_date: '2027-09-15T10:00:00Z',
          user_id: user.id,
          service_id: firstService.id
        },
        {
          value_token: 'tok_live_4e8b1d6c9a2f7b3e',
          creation_date: '2026-08-20T14:30:00Z',
          expiration_date: '2026-11-30T14:30:00Z',
          user_id: user.id,
          service_id: secondService.id
        }
      ]);
      console.log('Se crearon 2 tokens de ejemplo');
    } else {
      console.log(`Los tokens ya existian (${existingTokens})`);
    }

    console.log('\nListo. Credenciales del demo:');
    console.log(`  email    : ${DEMO_USER.email}`);
    console.log(`  password : ${DEMO_USER.password}`);
  } catch (error) {
    console.error('Error en el seed:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();