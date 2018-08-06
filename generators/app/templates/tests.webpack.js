var context = require.context('./test', true, /\.karma\.js$/);
context.keys().forEach(context);