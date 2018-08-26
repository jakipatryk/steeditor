# Steeditor

An advanced editor for the Steem posts, not only for advanced users!

## Setup

#### Clone repo and install dependencies.
```
git clone https://github.com/jakipatryk/steeditor.git

cd steeditor

npm install
```

#### Install Angular CLI
```
npm install -g @angular/cli
```

#### Adjust environment variables for your needs (in *src/environment* folder):
```typescript
// DEV
export const environment = {
  production: false,
  steemConnectConfig: {
    clientId: 'testing-env.app',
    scope: ['comment', 'comment_options']
  }
};

// PROD
export const environment = {
  production: true,
  steemConnectConfig: {
    clientId: 'steeditor.app',
    scope: ['comment', 'comment_options']
  }
};
```

If you decide to use `testing-env.app` for development environment, the redirect URL in SteemConnect is already set up. Otherwise, make sure that your SteemConnect app has correct redirect URLs set up:
- **DEV**: `http://localhost:4200/__/steemconnect/redirect`
- **PROD**: `https://<YOUR-DOMAIN>/__/steemconnect/redirect`

#### Run development server
```
npm start
```

#### Build for production
```
npm run build
```

#### Run unit and integration tests
```
npm run test
```

#### Run linter
```
npm run lint
```

## General coding guidelines
- prefer declarative and functional code and use `ramda` to achieve this
- components should NOT be aware of external data
- containers should be aware of external data (selected from Store)
- containers should dispatch actions
- containers should pass data to components using *Observables* + *async pipe*

