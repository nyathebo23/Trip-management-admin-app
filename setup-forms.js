const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

let names = ['payment-method', 'agency', 'bus', 'agency-agent', 'admin-account', 'customer', 'bus-driver',
    'travel-ticket', 'ticket-refund'];

    
for(let i = 0; i < names.length; i++) {
    let name = names[i];
    run(`ng generate component ${name}-management/${name}-edit-dialog`);
    run(`ng generate component ${name}-management/${name}-form`);
    run(`ng generate component ${name}-management/${name}-table-list`);
    run(`ng generate component ${name}-management/${name}-management`);
}
