# 🧪 Instrucciones de Prueba - Paso a Paso

## ✅ test-upload.html FUNCIONA → Ahora probemos index.html

Ya que `test-upload.html` funciona, significa que:
- ✓ Tu navegador permite cargar archivos
- ✓ Los archivos .txt están bien formateados
- ✓ El código básico de carga funciona

---

## 📝 Prueba el index.html Actualizado

### Paso 1: Descarga los Archivos Actualizados
Descarga de nuevo estos 3 archivos (están corregidos):
- [ ] `index.html`
- [ ] `script.js` (¡IMPORTANTE! Este tiene los cambios)
- [ ] `styles.css`

### Paso 2: Reemplaza los Archivos Antiguos
- Borra o renombra los archivos antiguos
- Pon los nuevos en su lugar
- Asegúrate de que estén en la MISMA carpeta que:
  - `example-source.txt`
  - `example-target.txt`

### Paso 3: Abre con el Navegador
1. **Cierra completamente el navegador** (para limpiar caché)
2. Abre el navegador de nuevo
3. Arrastra `index.html` a la ventana del navegador
   - O haz clic derecho → Abrir con → Chrome/Firefox

### Paso 4: Abre la Consola de Desarrollador
**MUY IMPORTANTE para ver qué pasa:**
1. Presiona `F12` (o Ctrl + Shift + I)
2. Ve a la pestaña "Console"
3. Deberías ver estos mensajes en verde:
   ```
   ✓ Source file input listener attached
   ✓ Target file input listener attached
   ```

**Si ves esto en rojo:**
```
❌ Source file input not found
❌ Target file input not found
```
→ Significa que el HTML no se cargó bien. Descarga `index.html` de nuevo.

### Paso 5: Prueba Cargar un Archivo
1. En la sección "1. Input Translation Pair"
2. Haz clic en el botón azul: **"📁 Or upload source text file"**
3. Selecciona `example-source.txt`
4. Observa la consola (F12)

**Deberías ver:**
```
handleFileUpload called for: source
File selected: example-source.txt Size: XXX bytes Type: text/plain
Starting to read file...
File loaded successfully! Content length: XXX
Content added to source textarea
```

**Si ves esto, ¡FUNCIONA!** ✅

### Paso 6: Verifica el Resultado
- [ ] El texto aparece en el textarea de "Source Text"
- [ ] Aparece un mensaje verde: "✓ File 'example-source.txt' loaded successfully!"
- [ ] No hay errores rojos en la consola

### Paso 7: Prueba el Segundo Archivo
Repite con el botón: **"📁 Or upload translation file"**
- Selecciona `example-target.txt`
- Verifica que aparece en el textarea de "Target Translation"

### Paso 8: Usa la Herramienta Completa
1. Asegúrate de que ambos textareas tengan contenido
2. Rellena "Project Name": `Test de Carga`
3. Click en **"Load Texts for Annotation"**
4. La herramienta debería activarse y mostrar los textos

---

## 🐛 Si Aún No Funciona

### Check #1: ¿Qué dice la consola cuando haces clic?
Abre F12 → Console y busca:

**Caso A: No aparece NADA cuando haces clic**
→ El event listener no está conectado
→ Descarga `script.js` de nuevo

**Caso B: Aparece "handleFileUpload called" pero nada más**
→ El archivo no se está leyendo
→ Verifica que el archivo sea .txt y menor de 1MB

**Caso C: Aparece un error rojo**
→ Copia el error completo y dímelo

### Check #2: Verifica los IDs en el HTML
Pega esto en la consola (F12):
```javascript
console.log('sourceFile:', document.getElementById('sourceFile'));
console.log('targetFile:', document.getElementById('targetFile'));
console.log('sourceText:', document.getElementById('sourceText'));
console.log('targetText:', document.getElementById('targetText'));
```

**Todos deben mostrar elementos, no `null`**

### Check #3: Intenta con otro navegador
Si usas Chrome, prueba con Firefox
Si usas Firefox, prueba con Chrome

---

## 📋 Checklist de Archivos

Verifica que tienes estos archivos en la misma carpeta:

```
📁 Mi carpeta del proyecto/
  ├── index.html ⭐ (actualizado)
  ├── styles.css ⭐ (actualizado)
  ├── script.js ⭐ (actualizado)
  ├── example-source.txt
  ├── example-target.txt
  ├── test-upload.html (opcional, para verificar)
  ├── README.md (opcional)
  └── EXAMPLE.md (opcional)
```

---

## 💡 Diferencias Clave entre test-upload.html y index.html

**test-upload.html:**
- Simple, todo el código en un archivo
- Declaraciones directas sin `DOMContentLoaded`
- Funcionó ✅

**index.html (versión corregida):**
- Más complejo, código separado en archivos
- Usa `DOMContentLoaded` para esperar que cargue todo
- Ahora los file inputs se inicializan DESPUÉS de que carga el DOM
- Con logging en consola para debug

---

## 🆘 Necesito Ayuda - Dime:

Si después de seguir todos los pasos aún no funciona:

1. **¿Qué navegador usas?** (Chrome 120, Firefox 121, Edge, Safari...)
2. **¿Qué ves en la consola F12?** (copia TODO lo que aparece)
3. **¿Los checks pasan?** (los 3 checks de arriba)
4. **¿Qué pasa cuando haces clic?**
   - [ ] Se abre el diálogo de selección de archivo
   - [ ] No pasa nada
   - [ ] Sale un error

---

## ✨ Si Todo Funciona

¡Genial! Ahora puedes:

1. ✅ Usar la herramienta completa
2. ✅ Anotar errores en las traducciones
3. ✅ Exportar reportes
4. ✅ Subir a GitHub Pages

**Siguiente paso:** Sigue la guía `GITHUB_WEB_GUIDE.md` para publicarla online

---

**Última actualización:** Enero 2026
