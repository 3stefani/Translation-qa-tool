# ⭐Translation Error Taxonomy & Annotation Tool⭐

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

A professional web-based tool for translation quality assessment using the MQM (Multidimensional Quality Metrics) framework. Designed for translation quality raters, MTPE specialists, and linguists to systematically assess and annotate translation errors.

## Live Demo

**Try it now:** [https://3stefani.github.io/Translation-qa-tool/](https://3stefani.github.io/Translation-qa-tool/)


## Features

### Core Functionality
- **MQM Framework Implementation**: Industry-standard error classification
  - Accuracy (Mistranslation, Omission, Addition, Untranslated)
  - Fluency (Grammar, Spelling, Punctuation, Inconsistency)
  - Style (Awkward, Unidiomatic, Register)
  - Terminology (Inappropriate, Inconsistent)

- **File Upload Support**: Load source and target texts from .txt or .md files
- **Interactive Annotation**: Click and select text directly to mark errors
- **Severity Rating System**: Critical, Major, Minor classifications
- **Real-time Quality Metrics**: Live statistics and error distribution charts
- **Multiple Export Formats**: JSON reports and CSV error lists
- **Privacy-First Design**: 100% client-side, all data stored locally in browser

### Technical Features
- ✅ No dependencies - Pure HTML/CSS/JavaScript
- ✅ Fully offline-capable
- ✅ LocalStorage for persistent data
- ✅ Responsive design (mobile-friendly)
- ✅ Professional UI/UX

## Use Cases

### For Translation QA Specialists
- Standardize error classification across projects
- Train new quality raters
- Document quality issues systematically
- Generate client-ready reports

### For MTPE Professionals
- Evaluate machine translation output quality
- Identify systematic MT errors
- Track post-editing effort metrics
- Compare different MT engines

### For Freelance Translators
- Build a professional portfolio
- Demonstrate QA expertise to clients
- Document post-editing process
- Show quality standards

### For Training & Education
- Teach translation quality assessment
- Practice error identification
- Learn MQM framework
- Build evaluation skills

## Quick Start

### Option 1: Use Online (Recommended)
Visit the [live demo](https://3stefani.github.io/Translation-qa-tool/) - no installation needed!

### Option 2: Run Locally
1. Download the repository or clone it:
   ```bash
   git clone https://github.com/3stefani/Translation-qa-tool.git
   ```
2. Open `index.html` in your web browser
3. Start annotating!

### Option 3: Try with Example Files
1. Download `example-source.txt` and `example-target.txt`
2. Open the tool
3. Use the "📁  Or upload source text file" buttons to load the example files
5. Follow the annotation guide in `EXAMPLE.md`

## How to Use

### Step 1: Load Translation Pair
1. Enter a project name (e.g., "Customer Service Email - Refund Request")
2. Select source and target languages
3. **Either:**
   - Type/paste the texts directly, OR
   - Click "📁 Or upload source text file" to load from a file
4. Click "Load Texts for Annotation"

### Step 2: Annotate Errors
1. Read both source and target texts
2. **Select any erroneous text** in the translation (click and drag)
3. A modal will appear - choose:
   - Error category (Accuracy, Fluency, Style, Terminology)
   - Specific error type
   - Severity level (Critical, Major, Minor)
   - Add notes or corrections (optional)
4. Click "Save Error"

### Step 3: Review & Export
- View real-time statistics and error distribution
- Analyze quality metrics
- Export detailed JSON report
- Export CSV of all errors for further analysis

## MQM Framework

This tool implements the **Multidimensional Quality Metrics (MQM)** framework, an industry standard for translation quality assessment used by companies like Google, Microsoft, and major Language Service Providers.

### Error Categories

| Category | Description | Example Types |
|----------|-------------|---------------|
| **Accuracy** | Content correctly transferred from source | Mistranslation, Omission, Addition |
| **Fluency** | Text reads naturally in target language | Grammar, Spelling, Punctuation |
| **Style** | Appropriate tone and register | Awkward phrasing, Register issues |
| **Terminology** | Correct domain-specific terms | Inappropriate or Inconsistent terms |

### Severity Levels

- **Critical**: Completely changes meaning or makes text unusable
- **Major**: Significantly impacts understanding or quality
- **Minor**: Noticeable but doesn't severely impact quality

## Technology Stack

- **Frontend**: HTML5, CSS3 (Grid, Flexbox)
- **Logic**: Vanilla JavaScript (ES6+)
- **Storage**: LocalStorage API
- **Charts**: HTML5 Canvas API
- **Dependencies**: None - completely standalone

## Project Structure

```
translation-qa-tool/
├── index.html              # Main application
├── styles.css              # Styling and responsive design
├── script.js               # Core functionality
├── README.md               # This file
├── EXAMPLE.md              # Folder with a detailed usage example and output files
├── example-source.txt      # Sample source text
├── example-target.txt      # Sample translation with errors
├── img                     # Folder containing screenshots of the app
├── video-demo-tool.mp4     # Video showing the performing of the app
└──  LICENSE                # MIT License
```

## 🔐 Privacy & Security

- ✅ **100% client-side**: No server communication, everything runs in your browser
- ✅ **No data collection**: Your translations remain completely private
- ✅ **No external dependencies**: Fully offline-capable
- ✅ **Local storage only**: Data stored in browser localStorage
- ✅ **Clear data anytime**: One-click reset

## 📸 Screenshots

*(Add screenshots here after deploying)*

## 🎓 Educational Value

This tool demonstrates professional translation QA workflows and best practices:
- MQM framework implementation
- Systematic error taxonomy
- Quality metrics calculation
- Professional reporting standards

Perfect for:
- Translation students learning quality assessment
- Professionals building QA portfolios
- LSPs standardizing review processes
- Trainers teaching translation quality

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to:
- Open an issue for bugs or feature requests
- Submit pull requests
- Share feedback and suggestions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute.

## 👤 Author

**Estefanía Ramírez Martínez**
- Translation QA Specialist & MTPE Expert
- 12+ years of experience in localization and quality assurance
- [LinkedIn](https://www.linkedin.com/in/estefania-ramirez)
- [GitHub](https://github.com/YOUR-USERNAME)

## 🔗 Related Resources

- [MQM Framework Documentation](http://www.qt21.eu/mqm-definition/definition-2015-12-30.html)
- [TAUS DQF Error Typology](https://www.taus.net/dqf)
- [ISO 17100 Translation Quality Standards](https://www.iso.org/standard/59149.html)

## 💡 Future Enhancements

Planned features for upcoming versions:
- AI-powered error suggestions
- Automated consistency checking
- Pattern recognition and learning
- PDF report generation
- Multi-project comparison
- Collaborative annotation mode

## ⭐ Show Your Support

If you find this tool useful, please consider:
- Giving it a ⭐ star on GitHub
- Sharing it with colleagues
- Contributing improvements
- Reporting issues or suggestions

---

**Note**: This is a professional QA tool for evaluating existing translations. It requires expert human judgment to identify and classify errors - it is not an automatic error detection system.

**Last Updated**: January 2026  
**Version**: 1.0.0
