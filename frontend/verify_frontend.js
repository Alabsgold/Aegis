const fs = require('fs');

const packages = [
    'next',
    'react',
    'react-dom',
    'lucide-react',
    'framer-motion',
    'next-themes',
    'clsx',
    'tailwind-merge',
    'tailwindcss-animate'
];

console.log("Verifying Frontend Dependencies...");
let missing = [];

packages.forEach(pkg => {
    try {
        require.resolve(pkg);
        console.log(`✅ ${pkg} installed`);
    } catch (e) {
        console.log(`❌ ${pkg} MISSING`);
        missing.push(pkg);
    }
});

if (missing.length > 0) {
    console.log(`\nMissing packages: ${missing.join(', ')}`);
    process.exit(1);
} else {
    console.log("\nAll frontend dependencies are installed!");
    process.exit(0);
}
