# TypeScript Configuration

This project uses **strict TypeScript mode** with the following key settings:

## Compiler Options

- **Target**: ES2020
- **Module**: ESNext
- **Strict mode**: Enabled (all strict checks active)
- **No implicit any**: Enforced
- **Strict null checks**: Enabled
- **No unchecked indexed access**: Enabled

## Files Structure

- **`.ts`** files for TypeScript code
- **`.vue`** files support `<script setup lang="ts">`
- **Type declarations** in `src/env.d.ts`

## Type Checking

```bash
# Check types without building
npm run type-check

# Build (includes type checking)
npm run build
```

## Writing Types

### Domain Models
```typescript
// core/domain/user/userDomain.ts
export interface User {
    id: string
    name: string
    email: string
}

export function createUser(data: unknown): User {
    // Validation logic
    return data as User
}
```

### API DTOs
```typescript
// core/api/user/userApi.ts
interface UserApiDto {
    id: string
    name: string
    email: string
}

export async function fetchUser(id: string): Promise<UserApiDto> {
    // API call
}
```

### Store Types
```typescript
// store/user/state/index.ts
import type { User } from '@/core/domain/user/userDomain'

export interface UserState {
    currentUser: User | null
    isLoading: boolean
}

export const initialState = (): UserState => ({
    currentUser: null,
    isLoading: false,
})
```

### Vue Components
```vue
<script setup lang="ts">
import type { User } from '@/core/domain/user/userDomain'

interface Props {
    user: User
    showDetails?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showDetails: false,
})
</script>
```

## ESLint Integration

ESLint is configured to check TypeScript files with type-aware rules:

- `@typescript-eslint/no-explicit-any`: Error
- `@typescript-eslint/no-unused-vars`: Error (except vars starting with `_`)
- Strict type checking enabled

## Common Patterns

### Type Guards
```typescript
export function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value
    )
}
```

### Generic Services
```typescript
export async function getById<T>(
    endpoint: string,
    id: string
): Promise<T> {
    const response = await get(endpoint)
    return response as T
}
```

### Utility Types
```typescript
// Make all properties optional
type PartialUser = Partial<User>

// Pick specific properties
type UserCredentials = Pick<User, 'email' | 'password'>

// Omit properties
type UserWithoutId = Omit<User, 'id'>
```
