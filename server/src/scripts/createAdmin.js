import { hashPassword } from "../lib/passwords.js";
import { prisma } from "../lib/prisma.js";
const [,,email,name,password] = process.argv;
if (!email || !name || !password) { console.error('Usage: npm run admin:create -- admin@example.com "Admin Name" "StrongPassword"'); process.exit(1); }
const user = await prisma.user.upsert({ where:{email:email.toLowerCase()}, update:{role:"ADMIN",name,passwordHash:await hashPassword(password)}, create:{email:email.toLowerCase(),name,passwordHash:await hashPassword(password),role:"ADMIN"} });
console.log(`Admin ready: ${user.email}`); await prisma.$disconnect();
