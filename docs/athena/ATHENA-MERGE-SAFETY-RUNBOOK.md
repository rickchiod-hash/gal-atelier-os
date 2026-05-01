# ATHENA MERGE SAFETY RUNBOOK

## Regras de Merge

### Feature → Dev
- ✅ Auto-merge SIM
- ❌ Revisão humana NÃO obrigatória
- ✅ CI obrigatória

### Dev → Homolog
- ❌ Auto-merge NÃO
- ✅ Revisão humana recomendada
- ✅ CI obrigatória

### Homolog → Main
- ❌ Auto-merge NÃO
- ✅ Revisão humana obrigatória
- ✅ CI obrigatória
- ✅ Security obrigatória

## O que NÃO fazer

| Ação | Motivo |
|------|-------|
| `--admin` | Bypassa protections |
| `git push --force` | Rewriting history |
| Force merge com conflitos | Quebra.build |
| Bypassar checks |温水煮青蛙 |

## Verificar Checks Antes de Merge

```bash
# Ver status do PR
gh pr view 123

# Ver checks
gh pr checks 123

# Ver diff
gh pr diff 123
```

## Auto-Merge não funciona?

1. Verificar se habilitado: Settings → General → Pull Requests → Allow auto-merge
2. Verificar seCI passou
3. Verificar se há conflitos
4. Habilitar manualmente no PR

## Rollback

```bash
# Reverter merge
git revert -m 1 <merge_commit>

# Push
git push origin main
```

---

**ATHENA V5.2**