"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/semver/internal/constants.js
  var require_constants = __commonJS({
    "node_modules/semver/internal/constants.js"(exports, module) {
      "use strict";
      var SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_LENGTH = 256;
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
      9007199254740991;
      var MAX_SAFE_COMPONENT_LENGTH = 16;
      var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
      var RELEASE_TYPES = [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease"
      ];
      module.exports = {
        MAX_LENGTH,
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_SAFE_INTEGER,
        RELEASE_TYPES,
        SEMVER_SPEC_VERSION,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
      };
    }
  });

  // node_modules/semver/internal/debug.js
  var require_debug = __commonJS({
    "node_modules/semver/internal/debug.js"(exports, module) {
      "use strict";
      var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
      };
      module.exports = debug;
    }
  });

  // node_modules/semver/internal/re.js
  var require_re = __commonJS({
    "node_modules/semver/internal/re.js"(exports, module) {
      "use strict";
      var {
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_LENGTH
      } = require_constants();
      var debug = require_debug();
      exports = module.exports = {};
      var re3 = exports.re = [];
      var safeRe = exports.safeRe = [];
      var src = exports.src = [];
      var safeSrc = exports.safeSrc = [];
      var t2 = exports.t = {};
      var R2 = 0;
      var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
      var safeRegexReplacements = [
        ["\\s", 1],
        ["\\d", MAX_LENGTH],
        [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
      ];
      var makeSafeRegex = (value) => {
        for (const [token, max] of safeRegexReplacements) {
          value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
        }
        return value;
      };
      var createToken = (name, value, isGlobal) => {
        const safe = makeSafeRegex(value);
        const index = R2++;
        debug(name, index, value);
        t2[name] = index;
        src[index] = value;
        safeSrc[index] = safe;
        re3[index] = new RegExp(value, isGlobal ? "g" : void 0);
        safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
      };
      createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
      createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
      createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
      createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
      createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIER]})`);
      createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
      createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
      createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
      createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
      createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
      createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
      createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
      createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
      createToken("GTLT", "((?:<|>)?=?)");
      createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
      createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
      createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
      createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
      createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
      createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
      createToken("COERCERTL", src[t2.COERCE], true);
      createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
      createToken("LONETILDE", "(?:~>?)");
      createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = "$1~";
      createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
      createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("LONECARET", "(?:\\^)");
      createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = "$1^";
      createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
      createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
      createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
      createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = "$1$2$3";
      createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
      createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
      createToken("STAR", "(<|>)?=?\\s*\\*");
      createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
      createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    }
  });

  // node_modules/semver/internal/parse-options.js
  var require_parse_options = __commonJS({
    "node_modules/semver/internal/parse-options.js"(exports, module) {
      "use strict";
      var looseOption = Object.freeze({ loose: true });
      var emptyOpts = Object.freeze({});
      var parseOptions = (options) => {
        if (!options) {
          return emptyOpts;
        }
        if (typeof options !== "object") {
          return looseOption;
        }
        return options;
      };
      module.exports = parseOptions;
    }
  });

  // node_modules/semver/internal/identifiers.js
  var require_identifiers = __commonJS({
    "node_modules/semver/internal/identifiers.js"(exports, module) {
      "use strict";
      var numeric = /^[0-9]+$/;
      var compareIdentifiers = (a2, b3) => {
        if (typeof a2 === "number" && typeof b3 === "number") {
          return a2 === b3 ? 0 : a2 < b3 ? -1 : 1;
        }
        const anum = numeric.test(a2);
        const bnum = numeric.test(b3);
        if (anum && bnum) {
          a2 = +a2;
          b3 = +b3;
        }
        return a2 === b3 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b3 ? -1 : 1;
      };
      var rcompareIdentifiers = (a2, b3) => compareIdentifiers(b3, a2);
      module.exports = {
        compareIdentifiers,
        rcompareIdentifiers
      };
    }
  });

  // node_modules/semver/classes/semver.js
  var require_semver = __commonJS({
    "node_modules/semver/classes/semver.js"(exports, module) {
      "use strict";
      var debug = require_debug();
      var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
      var { safeRe: re3, t: t2 } = require_re();
      var parseOptions = require_parse_options();
      var { compareIdentifiers } = require_identifiers();
      var SemVer = class _SemVer {
        constructor(version, options) {
          options = parseOptions(options);
          if (version instanceof _SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
              return version;
            } else {
              version = version.version;
            }
          } else if (typeof version !== "string") {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
          }
          if (version.length > MAX_LENGTH) {
            throw new TypeError(
              `version is longer than ${MAX_LENGTH} characters`
            );
          }
          debug("SemVer", version, options);
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          const m3 = version.trim().match(options.loose ? re3[t2.LOOSE] : re3[t2.FULL]);
          if (!m3) {
            throw new TypeError(`Invalid Version: ${version}`);
          }
          this.raw = version;
          this.major = +m3[1];
          this.minor = +m3[2];
          this.patch = +m3[3];
          if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError("Invalid major version");
          }
          if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError("Invalid minor version");
          }
          if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError("Invalid patch version");
          }
          if (!m3[4]) {
            this.prerelease = [];
          } else {
            this.prerelease = m3[4].split(".").map((id) => {
              if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                  return num;
                }
              }
              return id;
            });
          }
          this.build = m3[5] ? m3[5].split(".") : [];
          this.format();
        }
        format() {
          this.version = `${this.major}.${this.minor}.${this.patch}`;
          if (this.prerelease.length) {
            this.version += `-${this.prerelease.join(".")}`;
          }
          return this.version;
        }
        toString() {
          return this.version;
        }
        compare(other) {
          debug("SemVer.compare", this.version, this.options, other);
          if (!(other instanceof _SemVer)) {
            if (typeof other === "string" && other === this.version) {
              return 0;
            }
            other = new _SemVer(other, this.options);
          }
          if (other.version === this.version) {
            return 0;
          }
          return this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          if (this.major < other.major) {
            return -1;
          }
          if (this.major > other.major) {
            return 1;
          }
          if (this.minor < other.minor) {
            return -1;
          }
          if (this.minor > other.minor) {
            return 1;
          }
          if (this.patch < other.patch) {
            return -1;
          }
          if (this.patch > other.patch) {
            return 1;
          }
          return 0;
        }
        comparePre(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          if (this.prerelease.length && !other.prerelease.length) {
            return -1;
          } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
          } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
          }
          let i2 = 0;
          do {
            const a2 = this.prerelease[i2];
            const b3 = other.prerelease[i2];
            debug("prerelease compare", i2, a2, b3);
            if (a2 === void 0 && b3 === void 0) {
              return 0;
            } else if (b3 === void 0) {
              return 1;
            } else if (a2 === void 0) {
              return -1;
            } else if (a2 === b3) {
              continue;
            } else {
              return compareIdentifiers(a2, b3);
            }
          } while (++i2);
        }
        compareBuild(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          let i2 = 0;
          do {
            const a2 = this.build[i2];
            const b3 = other.build[i2];
            debug("build compare", i2, a2, b3);
            if (a2 === void 0 && b3 === void 0) {
              return 0;
            } else if (b3 === void 0) {
              return 1;
            } else if (a2 === void 0) {
              return -1;
            } else if (a2 === b3) {
              continue;
            } else {
              return compareIdentifiers(a2, b3);
            }
          } while (++i2);
        }
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        inc(release, identifier, identifierBase) {
          if (release.startsWith("pre")) {
            if (!identifier && identifierBase === false) {
              throw new Error("invalid increment argument: identifier is empty");
            }
            if (identifier) {
              const match = `-${identifier}`.match(this.options.loose ? re3[t2.PRERELEASELOOSE] : re3[t2.PRERELEASE]);
              if (!match || match[1] !== identifier) {
                throw new Error(`invalid identifier: ${identifier}`);
              }
            }
          }
          switch (release) {
            case "premajor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor = 0;
              this.major++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "preminor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "prepatch":
              this.prerelease.length = 0;
              this.inc("patch", identifier, identifierBase);
              this.inc("pre", identifier, identifierBase);
              break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case "prerelease":
              if (this.prerelease.length === 0) {
                this.inc("patch", identifier, identifierBase);
              }
              this.inc("pre", identifier, identifierBase);
              break;
            case "release":
              if (this.prerelease.length === 0) {
                throw new Error(`version ${this.raw} is not a prerelease`);
              }
              this.prerelease.length = 0;
              break;
            case "major":
              if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                this.major++;
              }
              this.minor = 0;
              this.patch = 0;
              this.prerelease = [];
              break;
            case "minor":
              if (this.patch !== 0 || this.prerelease.length === 0) {
                this.minor++;
              }
              this.patch = 0;
              this.prerelease = [];
              break;
            case "patch":
              if (this.prerelease.length === 0) {
                this.patch++;
              }
              this.prerelease = [];
              break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case "pre": {
              const base = Number(identifierBase) ? 1 : 0;
              if (this.prerelease.length === 0) {
                this.prerelease = [base];
              } else {
                let i2 = this.prerelease.length;
                while (--i2 >= 0) {
                  if (typeof this.prerelease[i2] === "number") {
                    this.prerelease[i2]++;
                    i2 = -2;
                  }
                }
                if (i2 === -1) {
                  if (identifier === this.prerelease.join(".") && identifierBase === false) {
                    throw new Error("invalid increment argument: identifier already exists");
                  }
                  this.prerelease.push(base);
                }
              }
              if (identifier) {
                let prerelease = [identifier, base];
                if (identifierBase === false) {
                  prerelease = [identifier];
                }
                if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                  if (isNaN(this.prerelease[1])) {
                    this.prerelease = prerelease;
                  }
                } else {
                  this.prerelease = prerelease;
                }
              }
              break;
            }
            default:
              throw new Error(`invalid increment argument: ${release}`);
          }
          this.raw = this.format();
          if (this.build.length) {
            this.raw += `+${this.build.join(".")}`;
          }
          return this;
        }
      };
      module.exports = SemVer;
    }
  });

  // node_modules/semver/functions/parse.js
  var require_parse = __commonJS({
    "node_modules/semver/functions/parse.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var parse = (version, options, throwErrors = false) => {
        if (version instanceof SemVer) {
          return version;
        }
        try {
          return new SemVer(version, options);
        } catch (er) {
          if (!throwErrors) {
            return null;
          }
          throw er;
        }
      };
      module.exports = parse;
    }
  });

  // node_modules/semver/functions/valid.js
  var require_valid = __commonJS({
    "node_modules/semver/functions/valid.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var valid = (version, options) => {
        const v3 = parse(version, options);
        return v3 ? v3.version : null;
      };
      module.exports = valid;
    }
  });

  // node_modules/semver/functions/clean.js
  var require_clean = __commonJS({
    "node_modules/semver/functions/clean.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var clean = (version, options) => {
        const s2 = parse(version.trim().replace(/^[=v]+/, ""), options);
        return s2 ? s2.version : null;
      };
      module.exports = clean;
    }
  });

  // node_modules/semver/functions/inc.js
  var require_inc = __commonJS({
    "node_modules/semver/functions/inc.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var inc = (version, release, options, identifier, identifierBase) => {
        if (typeof options === "string") {
          identifierBase = identifier;
          identifier = options;
          options = void 0;
        }
        try {
          return new SemVer(
            version instanceof SemVer ? version.version : version,
            options
          ).inc(release, identifier, identifierBase).version;
        } catch (er) {
          return null;
        }
      };
      module.exports = inc;
    }
  });

  // node_modules/semver/functions/diff.js
  var require_diff = __commonJS({
    "node_modules/semver/functions/diff.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var diff = (version1, version2) => {
        const v1 = parse(version1, null, true);
        const v22 = parse(version2, null, true);
        const comparison = v1.compare(v22);
        if (comparison === 0) {
          return null;
        }
        const v1Higher = comparison > 0;
        const highVersion = v1Higher ? v1 : v22;
        const lowVersion = v1Higher ? v22 : v1;
        const highHasPre = !!highVersion.prerelease.length;
        const lowHasPre = !!lowVersion.prerelease.length;
        if (lowHasPre && !highHasPre) {
          if (!lowVersion.patch && !lowVersion.minor) {
            return "major";
          }
          if (lowVersion.compareMain(highVersion) === 0) {
            if (lowVersion.minor && !lowVersion.patch) {
              return "minor";
            }
            return "patch";
          }
        }
        const prefix = highHasPre ? "pre" : "";
        if (v1.major !== v22.major) {
          return prefix + "major";
        }
        if (v1.minor !== v22.minor) {
          return prefix + "minor";
        }
        if (v1.patch !== v22.patch) {
          return prefix + "patch";
        }
        return "prerelease";
      };
      module.exports = diff;
    }
  });

  // node_modules/semver/functions/major.js
  var require_major = __commonJS({
    "node_modules/semver/functions/major.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var major = (a2, loose) => new SemVer(a2, loose).major;
      module.exports = major;
    }
  });

  // node_modules/semver/functions/minor.js
  var require_minor = __commonJS({
    "node_modules/semver/functions/minor.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var minor = (a2, loose) => new SemVer(a2, loose).minor;
      module.exports = minor;
    }
  });

  // node_modules/semver/functions/patch.js
  var require_patch = __commonJS({
    "node_modules/semver/functions/patch.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var patch = (a2, loose) => new SemVer(a2, loose).patch;
      module.exports = patch;
    }
  });

  // node_modules/semver/functions/prerelease.js
  var require_prerelease = __commonJS({
    "node_modules/semver/functions/prerelease.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var prerelease = (version, options) => {
        const parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      };
      module.exports = prerelease;
    }
  });

  // node_modules/semver/functions/compare.js
  var require_compare = __commonJS({
    "node_modules/semver/functions/compare.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var compare = (a2, b3, loose) => new SemVer(a2, loose).compare(new SemVer(b3, loose));
      module.exports = compare;
    }
  });

  // node_modules/semver/functions/rcompare.js
  var require_rcompare = __commonJS({
    "node_modules/semver/functions/rcompare.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var rcompare = (a2, b3, loose) => compare(b3, a2, loose);
      module.exports = rcompare;
    }
  });

  // node_modules/semver/functions/compare-loose.js
  var require_compare_loose = __commonJS({
    "node_modules/semver/functions/compare-loose.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var compareLoose = (a2, b3) => compare(a2, b3, true);
      module.exports = compareLoose;
    }
  });

  // node_modules/semver/functions/compare-build.js
  var require_compare_build = __commonJS({
    "node_modules/semver/functions/compare-build.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var compareBuild = (a2, b3, loose) => {
        const versionA = new SemVer(a2, loose);
        const versionB = new SemVer(b3, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      };
      module.exports = compareBuild;
    }
  });

  // node_modules/semver/functions/sort.js
  var require_sort = __commonJS({
    "node_modules/semver/functions/sort.js"(exports, module) {
      "use strict";
      var compareBuild = require_compare_build();
      var sort = (list, loose) => list.sort((a2, b3) => compareBuild(a2, b3, loose));
      module.exports = sort;
    }
  });

  // node_modules/semver/functions/rsort.js
  var require_rsort = __commonJS({
    "node_modules/semver/functions/rsort.js"(exports, module) {
      "use strict";
      var compareBuild = require_compare_build();
      var rsort = (list, loose) => list.sort((a2, b3) => compareBuild(b3, a2, loose));
      module.exports = rsort;
    }
  });

  // node_modules/semver/functions/gt.js
  var require_gt = __commonJS({
    "node_modules/semver/functions/gt.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var gt2 = (a2, b3, loose) => compare(a2, b3, loose) > 0;
      module.exports = gt2;
    }
  });

  // node_modules/semver/functions/lt.js
  var require_lt = __commonJS({
    "node_modules/semver/functions/lt.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var lt2 = (a2, b3, loose) => compare(a2, b3, loose) < 0;
      module.exports = lt2;
    }
  });

  // node_modules/semver/functions/eq.js
  var require_eq = __commonJS({
    "node_modules/semver/functions/eq.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var eq = (a2, b3, loose) => compare(a2, b3, loose) === 0;
      module.exports = eq;
    }
  });

  // node_modules/semver/functions/neq.js
  var require_neq = __commonJS({
    "node_modules/semver/functions/neq.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var neq = (a2, b3, loose) => compare(a2, b3, loose) !== 0;
      module.exports = neq;
    }
  });

  // node_modules/semver/functions/gte.js
  var require_gte = __commonJS({
    "node_modules/semver/functions/gte.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var gte = (a2, b3, loose) => compare(a2, b3, loose) >= 0;
      module.exports = gte;
    }
  });

  // node_modules/semver/functions/lte.js
  var require_lte = __commonJS({
    "node_modules/semver/functions/lte.js"(exports, module) {
      "use strict";
      var compare = require_compare();
      var lte = (a2, b3, loose) => compare(a2, b3, loose) <= 0;
      module.exports = lte;
    }
  });

  // node_modules/semver/functions/cmp.js
  var require_cmp = __commonJS({
    "node_modules/semver/functions/cmp.js"(exports, module) {
      "use strict";
      var eq = require_eq();
      var neq = require_neq();
      var gt2 = require_gt();
      var gte = require_gte();
      var lt2 = require_lt();
      var lte = require_lte();
      var cmp = (a2, op2, b3, loose) => {
        switch (op2) {
          case "===":
            if (typeof a2 === "object") {
              a2 = a2.version;
            }
            if (typeof b3 === "object") {
              b3 = b3.version;
            }
            return a2 === b3;
          case "!==":
            if (typeof a2 === "object") {
              a2 = a2.version;
            }
            if (typeof b3 === "object") {
              b3 = b3.version;
            }
            return a2 !== b3;
          case "":
          case "=":
          case "==":
            return eq(a2, b3, loose);
          case "!=":
            return neq(a2, b3, loose);
          case ">":
            return gt2(a2, b3, loose);
          case ">=":
            return gte(a2, b3, loose);
          case "<":
            return lt2(a2, b3, loose);
          case "<=":
            return lte(a2, b3, loose);
          default:
            throw new TypeError(`Invalid operator: ${op2}`);
        }
      };
      module.exports = cmp;
    }
  });

  // node_modules/semver/functions/coerce.js
  var require_coerce = __commonJS({
    "node_modules/semver/functions/coerce.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var parse = require_parse();
      var { safeRe: re3, t: t2 } = require_re();
      var coerce = (version, options) => {
        if (version instanceof SemVer) {
          return version;
        }
        if (typeof version === "number") {
          version = String(version);
        }
        if (typeof version !== "string") {
          return null;
        }
        options = options || {};
        let match = null;
        if (!options.rtl) {
          match = version.match(options.includePrerelease ? re3[t2.COERCEFULL] : re3[t2.COERCE]);
        } else {
          const coerceRtlRegex = options.includePrerelease ? re3[t2.COERCERTLFULL] : re3[t2.COERCERTL];
          let next;
          while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
              match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
          }
          coerceRtlRegex.lastIndex = -1;
        }
        if (match === null) {
          return null;
        }
        const major = match[2];
        const minor = match[3] || "0";
        const patch = match[4] || "0";
        const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
        const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
        return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
      };
      module.exports = coerce;
    }
  });

  // node_modules/semver/internal/lrucache.js
  var require_lrucache = __commonJS({
    "node_modules/semver/internal/lrucache.js"(exports, module) {
      "use strict";
      var LRUCache = class {
        constructor() {
          this.max = 1e3;
          this.map = /* @__PURE__ */ new Map();
        }
        get(key) {
          const value = this.map.get(key);
          if (value === void 0) {
            return void 0;
          } else {
            this.map.delete(key);
            this.map.set(key, value);
            return value;
          }
        }
        delete(key) {
          return this.map.delete(key);
        }
        set(key, value) {
          const deleted = this.delete(key);
          if (!deleted && value !== void 0) {
            if (this.map.size >= this.max) {
              const firstKey = this.map.keys().next().value;
              this.delete(firstKey);
            }
            this.map.set(key, value);
          }
          return this;
        }
      };
      module.exports = LRUCache;
    }
  });

  // node_modules/semver/classes/range.js
  var require_range = __commonJS({
    "node_modules/semver/classes/range.js"(exports, module) {
      "use strict";
      var SPACE_CHARACTERS = /\s+/g;
      var Range = class _Range {
        constructor(range, options) {
          options = parseOptions(options);
          if (range instanceof _Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
              return range;
            } else {
              return new _Range(range.raw, options);
            }
          }
          if (range instanceof Comparator) {
            this.raw = range.value;
            this.set = [[range]];
            this.formatted = void 0;
            return this;
          }
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
          this.set = this.raw.split("||").map((r2) => this.parseRange(r2.trim())).filter((c2) => c2.length);
          if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
          }
          if (this.set.length > 1) {
            const first = this.set[0];
            this.set = this.set.filter((c2) => !isNullSet(c2[0]));
            if (this.set.length === 0) {
              this.set = [first];
            } else if (this.set.length > 1) {
              for (const c2 of this.set) {
                if (c2.length === 1 && isAny(c2[0])) {
                  this.set = [c2];
                  break;
                }
              }
            }
          }
          this.formatted = void 0;
        }
        get range() {
          if (this.formatted === void 0) {
            this.formatted = "";
            for (let i2 = 0; i2 < this.set.length; i2++) {
              if (i2 > 0) {
                this.formatted += "||";
              }
              const comps = this.set[i2];
              for (let k3 = 0; k3 < comps.length; k3++) {
                if (k3 > 0) {
                  this.formatted += " ";
                }
                this.formatted += comps[k3].toString().trim();
              }
            }
          }
          return this.formatted;
        }
        format() {
          return this.range;
        }
        toString() {
          return this.range;
        }
        parseRange(range) {
          const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
          const memoKey = memoOpts + ":" + range;
          const cached = cache.get(memoKey);
          if (cached) {
            return cached;
          }
          const loose = this.options.loose;
          const hr = loose ? re3[t2.HYPHENRANGELOOSE] : re3[t2.HYPHENRANGE];
          range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
          debug("hyphen replace", range);
          range = range.replace(re3[t2.COMPARATORTRIM], comparatorTrimReplace);
          debug("comparator trim", range);
          range = range.replace(re3[t2.TILDETRIM], tildeTrimReplace);
          debug("tilde trim", range);
          range = range.replace(re3[t2.CARETTRIM], caretTrimReplace);
          debug("caret trim", range);
          let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
          if (loose) {
            rangeList = rangeList.filter((comp) => {
              debug("loose invalid filter", comp, this.options);
              return !!comp.match(re3[t2.COMPARATORLOOSE]);
            });
          }
          debug("range list", rangeList);
          const rangeMap = /* @__PURE__ */ new Map();
          const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
          for (const comp of comparators) {
            if (isNullSet(comp)) {
              return [comp];
            }
            rangeMap.set(comp.value, comp);
          }
          if (rangeMap.size > 1 && rangeMap.has("")) {
            rangeMap.delete("");
          }
          const result = [...rangeMap.values()];
          cache.set(memoKey, result);
          return result;
        }
        intersects(range, options) {
          if (!(range instanceof _Range)) {
            throw new TypeError("a Range is required");
          }
          return this.set.some((thisComparators) => {
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
              return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options);
                });
              });
            });
          });
        }
        // if ANY of the sets match ALL of its comparators, then pass
        test(version) {
          if (!version) {
            return false;
          }
          if (typeof version === "string") {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          for (let i2 = 0; i2 < this.set.length; i2++) {
            if (testSet(this.set[i2], version, this.options)) {
              return true;
            }
          }
          return false;
        }
      };
      module.exports = Range;
      var LRU = require_lrucache();
      var cache = new LRU();
      var parseOptions = require_parse_options();
      var Comparator = require_comparator();
      var debug = require_debug();
      var SemVer = require_semver();
      var {
        safeRe: re3,
        t: t2,
        comparatorTrimReplace,
        tildeTrimReplace,
        caretTrimReplace
      } = require_re();
      var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
      var isNullSet = (c2) => c2.value === "<0.0.0-0";
      var isAny = (c2) => c2.value === "";
      var isSatisfiable = (comparators, options) => {
        let result = true;
        const remainingComparators = comparators.slice();
        let testComparator = remainingComparators.pop();
        while (result && remainingComparators.length) {
          result = remainingComparators.every((otherComparator) => {
            return testComparator.intersects(otherComparator, options);
          });
          testComparator = remainingComparators.pop();
        }
        return result;
      };
      var parseComparator = (comp, options) => {
        comp = comp.replace(re3[t2.BUILD], "");
        debug("comp", comp, options);
        comp = replaceCarets(comp, options);
        debug("caret", comp);
        comp = replaceTildes(comp, options);
        debug("tildes", comp);
        comp = replaceXRanges(comp, options);
        debug("xrange", comp);
        comp = replaceStars(comp, options);
        debug("stars", comp);
        return comp;
      };
      var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
      var replaceTildes = (comp, options) => {
        return comp.trim().split(/\s+/).map((c2) => replaceTilde(c2, options)).join(" ");
      };
      var replaceTilde = (comp, options) => {
        const r2 = options.loose ? re3[t2.TILDELOOSE] : re3[t2.TILDE];
        return comp.replace(r2, (_3, M3, m3, p2, pr) => {
          debug("tilde", comp, _3, M3, m3, p2, pr);
          let ret;
          if (isX(M3)) {
            ret = "";
          } else if (isX(m3)) {
            ret = `>=${M3}.0.0 <${+M3 + 1}.0.0-0`;
          } else if (isX(p2)) {
            ret = `>=${M3}.${m3}.0 <${M3}.${+m3 + 1}.0-0`;
          } else if (pr) {
            debug("replaceTilde pr", pr);
            ret = `>=${M3}.${m3}.${p2}-${pr} <${M3}.${+m3 + 1}.0-0`;
          } else {
            ret = `>=${M3}.${m3}.${p2} <${M3}.${+m3 + 1}.0-0`;
          }
          debug("tilde return", ret);
          return ret;
        });
      };
      var replaceCarets = (comp, options) => {
        return comp.trim().split(/\s+/).map((c2) => replaceCaret(c2, options)).join(" ");
      };
      var replaceCaret = (comp, options) => {
        debug("caret", comp, options);
        const r2 = options.loose ? re3[t2.CARETLOOSE] : re3[t2.CARET];
        const z3 = options.includePrerelease ? "-0" : "";
        return comp.replace(r2, (_3, M3, m3, p2, pr) => {
          debug("caret", comp, _3, M3, m3, p2, pr);
          let ret;
          if (isX(M3)) {
            ret = "";
          } else if (isX(m3)) {
            ret = `>=${M3}.0.0${z3} <${+M3 + 1}.0.0-0`;
          } else if (isX(p2)) {
            if (M3 === "0") {
              ret = `>=${M3}.${m3}.0${z3} <${M3}.${+m3 + 1}.0-0`;
            } else {
              ret = `>=${M3}.${m3}.0${z3} <${+M3 + 1}.0.0-0`;
            }
          } else if (pr) {
            debug("replaceCaret pr", pr);
            if (M3 === "0") {
              if (m3 === "0") {
                ret = `>=${M3}.${m3}.${p2}-${pr} <${M3}.${m3}.${+p2 + 1}-0`;
              } else {
                ret = `>=${M3}.${m3}.${p2}-${pr} <${M3}.${+m3 + 1}.0-0`;
              }
            } else {
              ret = `>=${M3}.${m3}.${p2}-${pr} <${+M3 + 1}.0.0-0`;
            }
          } else {
            debug("no pr");
            if (M3 === "0") {
              if (m3 === "0") {
                ret = `>=${M3}.${m3}.${p2}${z3} <${M3}.${m3}.${+p2 + 1}-0`;
              } else {
                ret = `>=${M3}.${m3}.${p2}${z3} <${M3}.${+m3 + 1}.0-0`;
              }
            } else {
              ret = `>=${M3}.${m3}.${p2} <${+M3 + 1}.0.0-0`;
            }
          }
          debug("caret return", ret);
          return ret;
        });
      };
      var replaceXRanges = (comp, options) => {
        debug("replaceXRanges", comp, options);
        return comp.split(/\s+/).map((c2) => replaceXRange(c2, options)).join(" ");
      };
      var replaceXRange = (comp, options) => {
        comp = comp.trim();
        const r2 = options.loose ? re3[t2.XRANGELOOSE] : re3[t2.XRANGE];
        return comp.replace(r2, (ret, gtlt, M3, m3, p2, pr) => {
          debug("xRange", comp, ret, gtlt, M3, m3, p2, pr);
          const xM = isX(M3);
          const xm2 = xM || isX(m3);
          const xp = xm2 || isX(p2);
          const anyX = xp;
          if (gtlt === "=" && anyX) {
            gtlt = "";
          }
          pr = options.includePrerelease ? "-0" : "";
          if (xM) {
            if (gtlt === ">" || gtlt === "<") {
              ret = "<0.0.0-0";
            } else {
              ret = "*";
            }
          } else if (gtlt && anyX) {
            if (xm2) {
              m3 = 0;
            }
            p2 = 0;
            if (gtlt === ">") {
              gtlt = ">=";
              if (xm2) {
                M3 = +M3 + 1;
                m3 = 0;
                p2 = 0;
              } else {
                m3 = +m3 + 1;
                p2 = 0;
              }
            } else if (gtlt === "<=") {
              gtlt = "<";
              if (xm2) {
                M3 = +M3 + 1;
              } else {
                m3 = +m3 + 1;
              }
            }
            if (gtlt === "<") {
              pr = "-0";
            }
            ret = `${gtlt + M3}.${m3}.${p2}${pr}`;
          } else if (xm2) {
            ret = `>=${M3}.0.0${pr} <${+M3 + 1}.0.0-0`;
          } else if (xp) {
            ret = `>=${M3}.${m3}.0${pr} <${M3}.${+m3 + 1}.0-0`;
          }
          debug("xRange return", ret);
          return ret;
        });
      };
      var replaceStars = (comp, options) => {
        debug("replaceStars", comp, options);
        return comp.trim().replace(re3[t2.STAR], "");
      };
      var replaceGTE0 = (comp, options) => {
        debug("replaceGTE0", comp, options);
        return comp.trim().replace(re3[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
      };
      var hyphenReplace = (incPr) => ($0, from, fM, fm, fp2, fpr, fb, to2, tM, tm2, tp2, tpr) => {
        if (isX(fM)) {
          from = "";
        } else if (isX(fm)) {
          from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        } else if (isX(fp2)) {
          from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        } else if (fpr) {
          from = `>=${from}`;
        } else {
          from = `>=${from}${incPr ? "-0" : ""}`;
        }
        if (isX(tM)) {
          to2 = "";
        } else if (isX(tm2)) {
          to2 = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp2)) {
          to2 = `<${tM}.${+tm2 + 1}.0-0`;
        } else if (tpr) {
          to2 = `<=${tM}.${tm2}.${tp2}-${tpr}`;
        } else if (incPr) {
          to2 = `<${tM}.${tm2}.${+tp2 + 1}-0`;
        } else {
          to2 = `<=${to2}`;
        }
        return `${from} ${to2}`.trim();
      };
      var testSet = (set, version, options) => {
        for (let i2 = 0; i2 < set.length; i2++) {
          if (!set[i2].test(version)) {
            return false;
          }
        }
        if (version.prerelease.length && !options.includePrerelease) {
          for (let i2 = 0; i2 < set.length; i2++) {
            debug(set[i2].semver);
            if (set[i2].semver === Comparator.ANY) {
              continue;
            }
            if (set[i2].semver.prerelease.length > 0) {
              const allowed = set[i2].semver;
              if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      };
    }
  });

  // node_modules/semver/classes/comparator.js
  var require_comparator = __commonJS({
    "node_modules/semver/classes/comparator.js"(exports, module) {
      "use strict";
      var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
      var Comparator = class _Comparator {
        static get ANY() {
          return ANY;
        }
        constructor(comp, options) {
          options = parseOptions(options);
          if (comp instanceof _Comparator) {
            if (comp.loose === !!options.loose) {
              return comp;
            } else {
              comp = comp.value;
            }
          }
          comp = comp.trim().split(/\s+/).join(" ");
          debug("comparator", comp, options);
          this.options = options;
          this.loose = !!options.loose;
          this.parse(comp);
          if (this.semver === ANY) {
            this.value = "";
          } else {
            this.value = this.operator + this.semver.version;
          }
          debug("comp", this);
        }
        parse(comp) {
          const r2 = this.options.loose ? re3[t2.COMPARATORLOOSE] : re3[t2.COMPARATOR];
          const m3 = comp.match(r2);
          if (!m3) {
            throw new TypeError(`Invalid comparator: ${comp}`);
          }
          this.operator = m3[1] !== void 0 ? m3[1] : "";
          if (this.operator === "=") {
            this.operator = "";
          }
          if (!m3[2]) {
            this.semver = ANY;
          } else {
            this.semver = new SemVer(m3[2], this.options.loose);
          }
        }
        toString() {
          return this.value;
        }
        test(version) {
          debug("Comparator.test", version, this.options.loose);
          if (this.semver === ANY || version === ANY) {
            return true;
          }
          if (typeof version === "string") {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          return cmp(version, this.operator, this.semver, this.options);
        }
        intersects(comp, options) {
          if (!(comp instanceof _Comparator)) {
            throw new TypeError("a Comparator is required");
          }
          if (this.operator === "") {
            if (this.value === "") {
              return true;
            }
            return new Range(comp.value, options).test(this.value);
          } else if (comp.operator === "") {
            if (comp.value === "") {
              return true;
            }
            return new Range(this.value, options).test(comp.semver);
          }
          options = parseOptions(options);
          if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
            return false;
          }
          if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
            return false;
          }
          if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
            return true;
          }
          if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
            return true;
          }
          if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
            return true;
          }
          if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
            return true;
          }
          if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
            return true;
          }
          return false;
        }
      };
      module.exports = Comparator;
      var parseOptions = require_parse_options();
      var { safeRe: re3, t: t2 } = require_re();
      var cmp = require_cmp();
      var debug = require_debug();
      var SemVer = require_semver();
      var Range = require_range();
    }
  });

  // node_modules/semver/functions/satisfies.js
  var require_satisfies = __commonJS({
    "node_modules/semver/functions/satisfies.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var satisfies = (version, range, options) => {
        try {
          range = new Range(range, options);
        } catch (er) {
          return false;
        }
        return range.test(version);
      };
      module.exports = satisfies;
    }
  });

  // node_modules/semver/ranges/to-comparators.js
  var require_to_comparators = __commonJS({
    "node_modules/semver/ranges/to-comparators.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c2) => c2.value).join(" ").trim().split(" "));
      module.exports = toComparators;
    }
  });

  // node_modules/semver/ranges/max-satisfying.js
  var require_max_satisfying = __commonJS({
    "node_modules/semver/ranges/max-satisfying.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var maxSatisfying = (versions, range, options) => {
        let max = null;
        let maxSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach((v3) => {
          if (rangeObj.test(v3)) {
            if (!max || maxSV.compare(v3) === -1) {
              max = v3;
              maxSV = new SemVer(max, options);
            }
          }
        });
        return max;
      };
      module.exports = maxSatisfying;
    }
  });

  // node_modules/semver/ranges/min-satisfying.js
  var require_min_satisfying = __commonJS({
    "node_modules/semver/ranges/min-satisfying.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var minSatisfying = (versions, range, options) => {
        let min = null;
        let minSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach((v3) => {
          if (rangeObj.test(v3)) {
            if (!min || minSV.compare(v3) === 1) {
              min = v3;
              minSV = new SemVer(min, options);
            }
          }
        });
        return min;
      };
      module.exports = minSatisfying;
    }
  });

  // node_modules/semver/ranges/min-version.js
  var require_min_version = __commonJS({
    "node_modules/semver/ranges/min-version.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var gt2 = require_gt();
      var minVersion = (range, loose) => {
        range = new Range(range, loose);
        let minver = new SemVer("0.0.0");
        if (range.test(minver)) {
          return minver;
        }
        minver = new SemVer("0.0.0-0");
        if (range.test(minver)) {
          return minver;
        }
        minver = null;
        for (let i2 = 0; i2 < range.set.length; ++i2) {
          const comparators = range.set[i2];
          let setMin = null;
          comparators.forEach((comparator) => {
            const compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
              case ">":
                if (compver.prerelease.length === 0) {
                  compver.patch++;
                } else {
                  compver.prerelease.push(0);
                }
                compver.raw = compver.format();
              /* fallthrough */
              case "":
              case ">=":
                if (!setMin || gt2(compver, setMin)) {
                  setMin = compver;
                }
                break;
              case "<":
              case "<=":
                break;
              /* istanbul ignore next */
              default:
                throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
          });
          if (setMin && (!minver || gt2(minver, setMin))) {
            minver = setMin;
          }
        }
        if (minver && range.test(minver)) {
          return minver;
        }
        return null;
      };
      module.exports = minVersion;
    }
  });

  // node_modules/semver/ranges/valid.js
  var require_valid2 = __commonJS({
    "node_modules/semver/ranges/valid.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var validRange = (range, options) => {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      };
      module.exports = validRange;
    }
  });

  // node_modules/semver/ranges/outside.js
  var require_outside = __commonJS({
    "node_modules/semver/ranges/outside.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var Range = require_range();
      var satisfies = require_satisfies();
      var gt2 = require_gt();
      var lt2 = require_lt();
      var lte = require_lte();
      var gte = require_gte();
      var outside = (version, range, hilo, options) => {
        version = new SemVer(version, options);
        range = new Range(range, options);
        let gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
          case ">":
            gtfn = gt2;
            ltefn = lte;
            ltfn = lt2;
            comp = ">";
            ecomp = ">=";
            break;
          case "<":
            gtfn = lt2;
            ltefn = gte;
            ltfn = gt2;
            comp = "<";
            ecomp = "<=";
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version, range, options)) {
          return false;
        }
        for (let i2 = 0; i2 < range.set.length; ++i2) {
          const comparators = range.set[i2];
          let high = null;
          let low = null;
          comparators.forEach((comparator) => {
            if (comparator.semver === ANY) {
              comparator = new Comparator(">=0.0.0");
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
              high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
              low = comparator;
            }
          });
          if (high.operator === comp || high.operator === ecomp) {
            return false;
          }
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
            return false;
          } else if (low.operator === ecomp && ltfn(version, low.semver)) {
            return false;
          }
        }
        return true;
      };
      module.exports = outside;
    }
  });

  // node_modules/semver/ranges/gtr.js
  var require_gtr = __commonJS({
    "node_modules/semver/ranges/gtr.js"(exports, module) {
      "use strict";
      var outside = require_outside();
      var gtr = (version, range, options) => outside(version, range, ">", options);
      module.exports = gtr;
    }
  });

  // node_modules/semver/ranges/ltr.js
  var require_ltr = __commonJS({
    "node_modules/semver/ranges/ltr.js"(exports, module) {
      "use strict";
      var outside = require_outside();
      var ltr = (version, range, options) => outside(version, range, "<", options);
      module.exports = ltr;
    }
  });

  // node_modules/semver/ranges/intersects.js
  var require_intersects = __commonJS({
    "node_modules/semver/ranges/intersects.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var intersects = (r1, r2, options) => {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2, options);
      };
      module.exports = intersects;
    }
  });

  // node_modules/semver/ranges/simplify.js
  var require_simplify = __commonJS({
    "node_modules/semver/ranges/simplify.js"(exports, module) {
      "use strict";
      var satisfies = require_satisfies();
      var compare = require_compare();
      module.exports = (versions, range, options) => {
        const set = [];
        let first = null;
        let prev = null;
        const v3 = versions.sort((a2, b3) => compare(a2, b3, options));
        for (const version of v3) {
          const included = satisfies(version, range, options);
          if (included) {
            prev = version;
            if (!first) {
              first = version;
            }
          } else {
            if (prev) {
              set.push([first, prev]);
            }
            prev = null;
            first = null;
          }
        }
        if (first) {
          set.push([first, null]);
        }
        const ranges = [];
        for (const [min, max] of set) {
          if (min === max) {
            ranges.push(min);
          } else if (!max && min === v3[0]) {
            ranges.push("*");
          } else if (!max) {
            ranges.push(`>=${min}`);
          } else if (min === v3[0]) {
            ranges.push(`<=${max}`);
          } else {
            ranges.push(`${min} - ${max}`);
          }
        }
        const simplified = ranges.join(" || ");
        const original = typeof range.raw === "string" ? range.raw : String(range);
        return simplified.length < original.length ? simplified : range;
      };
    }
  });

  // node_modules/semver/ranges/subset.js
  var require_subset = __commonJS({
    "node_modules/semver/ranges/subset.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var satisfies = require_satisfies();
      var compare = require_compare();
      var subset = (sub, dom, options = {}) => {
        if (sub === dom) {
          return true;
        }
        sub = new Range(sub, options);
        dom = new Range(dom, options);
        let sawNonNull = false;
        OUTER: for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
              continue OUTER;
            }
          }
          if (sawNonNull) {
            return false;
          }
        }
        return true;
      };
      var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
      var minimumVersion = [new Comparator(">=0.0.0")];
      var simpleSubset = (sub, dom, options) => {
        if (sub === dom) {
          return true;
        }
        if (sub.length === 1 && sub[0].semver === ANY) {
          if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
          } else if (options.includePrerelease) {
            sub = minimumVersionWithPreRelease;
          } else {
            sub = minimumVersion;
          }
        }
        if (dom.length === 1 && dom[0].semver === ANY) {
          if (options.includePrerelease) {
            return true;
          } else {
            dom = minimumVersion;
          }
        }
        const eqSet = /* @__PURE__ */ new Set();
        let gt2, lt2;
        for (const c2 of sub) {
          if (c2.operator === ">" || c2.operator === ">=") {
            gt2 = higherGT(gt2, c2, options);
          } else if (c2.operator === "<" || c2.operator === "<=") {
            lt2 = lowerLT(lt2, c2, options);
          } else {
            eqSet.add(c2.semver);
          }
        }
        if (eqSet.size > 1) {
          return null;
        }
        let gtltComp;
        if (gt2 && lt2) {
          gtltComp = compare(gt2.semver, lt2.semver, options);
          if (gtltComp > 0) {
            return null;
          } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
            return null;
          }
        }
        for (const eq of eqSet) {
          if (gt2 && !satisfies(eq, String(gt2), options)) {
            return null;
          }
          if (lt2 && !satisfies(eq, String(lt2), options)) {
            return null;
          }
          for (const c2 of dom) {
            if (!satisfies(eq, String(c2), options)) {
              return false;
            }
          }
          return true;
        }
        let higher, lower;
        let hasDomLT, hasDomGT;
        let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
        let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
        if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
          needDomLTPre = false;
        }
        for (const c2 of dom) {
          hasDomGT = hasDomGT || c2.operator === ">" || c2.operator === ">=";
          hasDomLT = hasDomLT || c2.operator === "<" || c2.operator === "<=";
          if (gt2) {
            if (needDomGTPre) {
              if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomGTPre.major && c2.semver.minor === needDomGTPre.minor && c2.semver.patch === needDomGTPre.patch) {
                needDomGTPre = false;
              }
            }
            if (c2.operator === ">" || c2.operator === ">=") {
              higher = higherGT(gt2, c2, options);
              if (higher === c2 && higher !== gt2) {
                return false;
              }
            } else if (gt2.operator === ">=" && !satisfies(gt2.semver, String(c2), options)) {
              return false;
            }
          }
          if (lt2) {
            if (needDomLTPre) {
              if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomLTPre.major && c2.semver.minor === needDomLTPre.minor && c2.semver.patch === needDomLTPre.patch) {
                needDomLTPre = false;
              }
            }
            if (c2.operator === "<" || c2.operator === "<=") {
              lower = lowerLT(lt2, c2, options);
              if (lower === c2 && lower !== lt2) {
                return false;
              }
            } else if (lt2.operator === "<=" && !satisfies(lt2.semver, String(c2), options)) {
              return false;
            }
          }
          if (!c2.operator && (lt2 || gt2) && gtltComp !== 0) {
            return false;
          }
        }
        if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
          return false;
        }
        if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
          return false;
        }
        if (needDomGTPre || needDomLTPre) {
          return false;
        }
        return true;
      };
      var higherGT = (a2, b3, options) => {
        if (!a2) {
          return b3;
        }
        const comp = compare(a2.semver, b3.semver, options);
        return comp > 0 ? a2 : comp < 0 ? b3 : b3.operator === ">" && a2.operator === ">=" ? b3 : a2;
      };
      var lowerLT = (a2, b3, options) => {
        if (!a2) {
          return b3;
        }
        const comp = compare(a2.semver, b3.semver, options);
        return comp < 0 ? a2 : comp > 0 ? b3 : b3.operator === "<" && a2.operator === "<=" ? b3 : a2;
      };
      module.exports = subset;
    }
  });

  // node_modules/semver/index.js
  var require_semver2 = __commonJS({
    "node_modules/semver/index.js"(exports, module) {
      "use strict";
      var internalRe = require_re();
      var constants = require_constants();
      var SemVer = require_semver();
      var identifiers = require_identifiers();
      var parse = require_parse();
      var valid = require_valid();
      var clean = require_clean();
      var inc = require_inc();
      var diff = require_diff();
      var major = require_major();
      var minor = require_minor();
      var patch = require_patch();
      var prerelease = require_prerelease();
      var compare = require_compare();
      var rcompare = require_rcompare();
      var compareLoose = require_compare_loose();
      var compareBuild = require_compare_build();
      var sort = require_sort();
      var rsort = require_rsort();
      var gt2 = require_gt();
      var lt2 = require_lt();
      var eq = require_eq();
      var neq = require_neq();
      var gte = require_gte();
      var lte = require_lte();
      var cmp = require_cmp();
      var coerce = require_coerce();
      var Comparator = require_comparator();
      var Range = require_range();
      var satisfies = require_satisfies();
      var toComparators = require_to_comparators();
      var maxSatisfying = require_max_satisfying();
      var minSatisfying = require_min_satisfying();
      var minVersion = require_min_version();
      var validRange = require_valid2();
      var outside = require_outside();
      var gtr = require_gtr();
      var ltr = require_ltr();
      var intersects = require_intersects();
      var simplifyRange = require_simplify();
      var subset = require_subset();
      module.exports = {
        parse,
        valid,
        clean,
        inc,
        diff,
        major,
        minor,
        patch,
        prerelease,
        compare,
        rcompare,
        compareLoose,
        compareBuild,
        sort,
        rsort,
        gt: gt2,
        lt: lt2,
        eq,
        neq,
        gte,
        lte,
        cmp,
        coerce,
        Comparator,
        Range,
        satisfies,
        toComparators,
        maxSatisfying,
        minSatisfying,
        minVersion,
        validRange,
        outside,
        gtr,
        ltr,
        intersects,
        simplifyRange,
        subset,
        SemVer,
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: constants.RELEASE_TYPES,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers
      };
    }
  });

  // node_modules/marked/lib/marked.esm.js
  function z() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var T = z();
  function G(u4) {
    T = u4;
  }
  var _ = { exec: () => null };
  function k(u4, e2 = "") {
    let t2 = typeof u4 == "string" ? u4 : u4.source, n2 = { replace: (r2, i2) => {
      let s2 = typeof i2 == "string" ? i2 : i2.source;
      return s2 = s2.replace(m.caret, "$1"), t2 = t2.replace(r2, s2), n2;
    }, getRegex: () => new RegExp(t2, e2) };
    return n2;
  }
  var Re = (() => {
    try {
      return !!new RegExp("(?<=1)(?<!1)");
    } catch {
      return false;
    }
  })();
  var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u4) => new RegExp(`^( {0,3}${u4})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}#`), htmlBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}>`) };
  var Te = /^(?:[ \t]*(?:\n|$))+/;
  var Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var we = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var C = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var ye = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var Q = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
  var ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var oe = k(ie).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var Pe = k(ie).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var j = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var Se = /^[^\n]+/;
  var F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
  var $e = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var Le = k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Q).getRegex();
  var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var _e = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var ae = k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var Me = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ae).getRegex();
  var K = { blockquote: Me, code: Oe, def: $e, fences: we, heading: ye, hr: C, html: _e, lheading: oe, list: Le, newline: Te, paragraph: ae, table: _, text: Se };
  var re = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var ze = { ...K, lheading: Pe, table: re, paragraph: k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
  var Ee = { ...K, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: _, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(j).replace("hr", C).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var Ie = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var le = /^( {2,}|\\)\n(?!\s*$)/;
  var Ce = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var E = /[\p{P}\p{S}]/u;
  var H = /[\s\p{P}\p{S}]/u;
  var W = /[^\s\p{P}\p{S}]/u;
  var Be = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex();
  var ue = /(?!~)[\p{P}\p{S}]/u;
  var De = /(?!~)[\s\p{P}\p{S}]/u;
  var qe = /(?:[^\s\p{P}\p{S}]|~)/u;
  var ve = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Re ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
  var pe = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
  var He = k(pe, "u").replace(/punct/g, E).getRegex();
  var Ze = k(pe, "u").replace(/punct/g, ue).getRegex();
  var ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var Ge = k(ce, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var Ne = k(ce, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, De).replace(/punct/g, ue).getRegex();
  var Qe = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var je = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, E).getRegex();
  var Fe = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
  var Ue = k(Fe, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var Ke = k(/\\(punct)/, "gu").replace(/punct/g, E).getRegex();
  var We = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var Xe = k(U).replace("(?:-->|$)", "-->").getRegex();
  var Je = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Xe).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/;
  var Ve = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var he = k(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", F).getRegex();
  var ke = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex();
  var Ye = k("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", ke).getRegex();
  var se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
  var X = { _backpedal: _, anyPunctuation: Ke, autolink: We, blockSkip: ve, br: le, code: Ae, del: _, delLDelim: _, delRDelim: _, emStrongLDelim: He, emStrongRDelimAst: Ge, emStrongRDelimUnd: Qe, escape: Ie, link: Ve, nolink: ke, punctuation: Be, reflink: he, reflinkSearch: Ye, tag: Je, text: Ce, url: _ };
  var et = { ...X, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
  var N = { ...X, emStrongRDelimAst: Ne, emStrongLDelim: Ze, delLDelim: je, delRDelim: Ue, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", se).getRegex() };
  var tt = { ...N, br: k(le).replace("{2,}", "*").getRegex(), text: k(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var B = { normal: K, gfm: ze, pedantic: Ee };
  var I = { normal: X, gfm: N, breaks: tt, pedantic: et };
  var nt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var de = (u4) => nt[u4];
  function O(u4, e2) {
    if (e2) {
      if (m.escapeTest.test(u4)) return u4.replace(m.escapeReplace, de);
    } else if (m.escapeTestNoEncode.test(u4)) return u4.replace(m.escapeReplaceNoEncode, de);
    return u4;
  }
  function J(u4) {
    try {
      u4 = encodeURI(u4).replace(m.percentDecode, "%");
    } catch {
      return null;
    }
    return u4;
  }
  function V(u4, e2) {
    let t2 = u4.replace(m.findPipe, (i2, s2, a2) => {
      let o2 = false, l2 = s2;
      for (; --l2 >= 0 && a2[l2] === "\\"; ) o2 = !o2;
      return o2 ? "|" : " |";
    }), n2 = t2.split(m.splitPipe), r2 = 0;
    if (n2[0].trim() || n2.shift(), n2.length > 0 && !n2.at(-1)?.trim() && n2.pop(), e2) if (n2.length > e2) n2.splice(e2);
    else for (; n2.length < e2; ) n2.push("");
    for (; r2 < n2.length; r2++) n2[r2] = n2[r2].trim().replace(m.slashPipe, "|");
    return n2;
  }
  function $(u4, e2, t2) {
    let n2 = u4.length;
    if (n2 === 0) return "";
    let r2 = 0;
    for (; r2 < n2; ) {
      let i2 = u4.charAt(n2 - r2 - 1);
      if (i2 === e2 && !t2) r2++;
      else if (i2 !== e2 && t2) r2++;
      else break;
    }
    return u4.slice(0, n2 - r2);
  }
  function Y(u4) {
    let e2 = u4.split(`
`), t2 = e2.length - 1;
    for (; t2 >= 0 && !e2[t2].trim(); ) t2--;
    return e2.length - t2 <= 2 ? u4 : e2.slice(0, t2 + 1).join(`
`);
  }
  function ge(u4, e2) {
    if (u4.indexOf(e2[1]) === -1) return -1;
    let t2 = 0;
    for (let n2 = 0; n2 < u4.length; n2++) if (u4[n2] === "\\") n2++;
    else if (u4[n2] === e2[0]) t2++;
    else if (u4[n2] === e2[1] && (t2--, t2 < 0)) return n2;
    return t2 > 0 ? -2 : -1;
  }
  function fe(u4, e2 = 0) {
    let t2 = e2, n2 = "";
    for (let r2 of u4) if (r2 === "	") {
      let i2 = 4 - t2 % 4;
      n2 += " ".repeat(i2), t2 += i2;
    } else n2 += r2, t2++;
    return n2;
  }
  function me(u4, e2, t2, n2, r2) {
    let i2 = e2.href, s2 = e2.title || null, a2 = u4[1].replace(r2.other.outputLinkReplace, "$1");
    n2.state.inLink = true;
    let o2 = { type: u4[0].charAt(0) === "!" ? "image" : "link", raw: t2, href: i2, title: s2, text: a2, tokens: n2.inlineTokens(a2) };
    return n2.state.inLink = false, o2;
  }
  function rt(u4, e2, t2) {
    let n2 = u4.match(t2.other.indentCodeCompensation);
    if (n2 === null) return e2;
    let r2 = n2[1];
    return e2.split(`
`).map((i2) => {
      let s2 = i2.match(t2.other.beginningSpace);
      if (s2 === null) return i2;
      let [a2] = s2;
      return a2.length >= r2.length ? i2.slice(r2.length) : i2;
    }).join(`
`);
  }
  var w = class {
    options;
    rules;
    lexer;
    constructor(e2) {
      this.options = e2 || T;
    }
    space(e2) {
      let t2 = this.rules.block.newline.exec(e2);
      if (t2 && t2[0].length > 0) return { type: "space", raw: t2[0] };
    }
    code(e2) {
      let t2 = this.rules.block.code.exec(e2);
      if (t2) {
        let n2 = this.options.pedantic ? t2[0] : Y(t2[0]), r2 = n2.replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: n2, codeBlockStyle: "indented", text: r2 };
      }
    }
    fences(e2) {
      let t2 = this.rules.block.fences.exec(e2);
      if (t2) {
        let n2 = t2[0], r2 = rt(n2, t2[3] || "", this.rules);
        return { type: "code", raw: n2, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: r2 };
      }
    }
    heading(e2) {
      let t2 = this.rules.block.heading.exec(e2);
      if (t2) {
        let n2 = t2[2].trim();
        if (this.rules.other.endingHash.test(n2)) {
          let r2 = $(n2, "#");
          (this.options.pedantic || !r2 || this.rules.other.endingSpaceChar.test(r2)) && (n2 = r2.trim());
        }
        return { type: "heading", raw: $(t2[0], `
`), depth: t2[1].length, text: n2, tokens: this.lexer.inline(n2) };
      }
    }
    hr(e2) {
      let t2 = this.rules.block.hr.exec(e2);
      if (t2) return { type: "hr", raw: $(t2[0], `
`) };
    }
    blockquote(e2) {
      let t2 = this.rules.block.blockquote.exec(e2);
      if (t2) {
        let n2 = $(t2[0], `
`).split(`
`), r2 = "", i2 = "", s2 = [];
        for (; n2.length > 0; ) {
          let a2 = false, o2 = [], l2;
          for (l2 = 0; l2 < n2.length; l2++) if (this.rules.other.blockquoteStart.test(n2[l2])) o2.push(n2[l2]), a2 = true;
          else if (!a2) o2.push(n2[l2]);
          else break;
          n2 = n2.slice(l2);
          let p2 = o2.join(`
`), c2 = p2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          r2 = r2 ? `${r2}
${p2}` : p2, i2 = i2 ? `${i2}
${c2}` : c2;
          let d2 = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(c2, s2, true), this.lexer.state.top = d2, n2.length === 0) break;
          let h2 = s2.at(-1);
          if (h2?.type === "code") break;
          if (h2?.type === "blockquote") {
            let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), S2 = this.blockquote(f2);
            s2[s2.length - 1] = S2, r2 = r2.substring(0, r2.length - R2.raw.length) + S2.raw, i2 = i2.substring(0, i2.length - R2.text.length) + S2.text;
            break;
          } else if (h2?.type === "list") {
            let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), S2 = this.list(f2);
            s2[s2.length - 1] = S2, r2 = r2.substring(0, r2.length - h2.raw.length) + S2.raw, i2 = i2.substring(0, i2.length - R2.raw.length) + S2.raw, n2 = f2.substring(s2.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: r2, tokens: s2, text: i2 };
      }
    }
    list(e2) {
      let t2 = this.rules.block.list.exec(e2);
      if (t2) {
        let n2 = t2[1].trim(), r2 = n2.length > 1, i2 = { type: "list", raw: "", ordered: r2, start: r2 ? +n2.slice(0, -1) : "", loose: false, items: [] };
        n2 = r2 ? `\\d{1,9}\\${n2.slice(-1)}` : `\\${n2}`, this.options.pedantic && (n2 = r2 ? n2 : "[*+-]");
        let s2 = this.rules.other.listItemRegex(n2), a2 = false;
        for (; e2; ) {
          let l2 = false, p2 = "", c2 = "";
          if (!(t2 = s2.exec(e2)) || this.rules.block.hr.test(e2)) break;
          p2 = t2[0], e2 = e2.substring(p2.length);
          let d2 = fe(t2[2].split(`
`, 1)[0], t2[1].length), h2 = e2.split(`
`, 1)[0], R2 = !d2.trim(), f2 = 0;
          if (this.options.pedantic ? (f2 = 2, c2 = d2.trimStart()) : R2 ? f2 = t2[1].length + 1 : (f2 = d2.search(this.rules.other.nonSpaceChar), f2 = f2 > 4 ? 1 : f2, c2 = d2.slice(f2), f2 += t2[1].length), R2 && this.rules.other.blankLine.test(h2) && (p2 += h2 + `
`, e2 = e2.substring(h2.length + 1), l2 = true), !l2) {
            let S2 = this.rules.other.nextBulletRegex(f2), ee2 = this.rules.other.hrRegex(f2), te2 = this.rules.other.fencesBeginRegex(f2), ne2 = this.rules.other.headingBeginRegex(f2), xe2 = this.rules.other.htmlBeginRegex(f2), be2 = this.rules.other.blockquoteBeginRegex(f2);
            for (; e2; ) {
              let Z2 = e2.split(`
`, 1)[0], A2;
              if (h2 = Z2, this.options.pedantic ? (h2 = h2.replace(this.rules.other.listReplaceNesting, "  "), A2 = h2) : A2 = h2.replace(this.rules.other.tabCharGlobal, "    "), te2.test(h2) || ne2.test(h2) || xe2.test(h2) || be2.test(h2) || S2.test(h2) || ee2.test(h2)) break;
              if (A2.search(this.rules.other.nonSpaceChar) >= f2 || !h2.trim()) c2 += `
` + A2.slice(f2);
              else {
                if (R2 || d2.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te2.test(d2) || ne2.test(d2) || ee2.test(d2)) break;
                c2 += `
` + h2;
              }
              R2 = !h2.trim(), p2 += Z2 + `
`, e2 = e2.substring(Z2.length + 1), d2 = A2.slice(f2);
            }
          }
          i2.loose || (a2 ? i2.loose = true : this.rules.other.doubleBlankLine.test(p2) && (a2 = true)), i2.items.push({ type: "list_item", raw: p2, task: !!this.options.gfm && this.rules.other.listIsTask.test(c2), loose: false, text: c2, tokens: [] }), i2.raw += p2;
        }
        let o2 = i2.items.at(-1);
        if (o2) o2.raw = o2.raw.trimEnd(), o2.text = o2.text.trimEnd();
        else return;
        i2.raw = i2.raw.trimEnd();
        for (let l2 of i2.items) {
          if (this.lexer.state.top = false, l2.tokens = this.lexer.blockTokens(l2.text, []), l2.task) {
            if (l2.text = l2.text.replace(this.rules.other.listReplaceTask, ""), l2.tokens[0]?.type === "text" || l2.tokens[0]?.type === "paragraph") {
              l2.tokens[0].raw = l2.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l2.tokens[0].text = l2.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
              for (let c2 = this.lexer.inlineQueue.length - 1; c2 >= 0; c2--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c2].src)) {
                this.lexer.inlineQueue[c2].src = this.lexer.inlineQueue[c2].src.replace(this.rules.other.listReplaceTask, "");
                break;
              }
            }
            let p2 = this.rules.other.listTaskCheckbox.exec(l2.raw);
            if (p2) {
              let c2 = { type: "checkbox", raw: p2[0] + " ", checked: p2[0] !== "[ ]" };
              l2.checked = c2.checked, i2.loose ? l2.tokens[0] && ["paragraph", "text"].includes(l2.tokens[0].type) && "tokens" in l2.tokens[0] && l2.tokens[0].tokens ? (l2.tokens[0].raw = c2.raw + l2.tokens[0].raw, l2.tokens[0].text = c2.raw + l2.tokens[0].text, l2.tokens[0].tokens.unshift(c2)) : l2.tokens.unshift({ type: "paragraph", raw: c2.raw, text: c2.raw, tokens: [c2] }) : l2.tokens.unshift(c2);
            }
          }
          if (!i2.loose) {
            let p2 = l2.tokens.filter((d2) => d2.type === "space"), c2 = p2.length > 0 && p2.some((d2) => this.rules.other.anyLine.test(d2.raw));
            i2.loose = c2;
          }
        }
        if (i2.loose) for (let l2 of i2.items) {
          l2.loose = true;
          for (let p2 of l2.tokens) p2.type === "text" && (p2.type = "paragraph");
        }
        return i2;
      }
    }
    html(e2) {
      let t2 = this.rules.block.html.exec(e2);
      if (t2) {
        let n2 = Y(t2[0]);
        return { type: "html", block: true, raw: n2, pre: t2[1] === "pre" || t2[1] === "script" || t2[1] === "style", text: n2 };
      }
    }
    def(e2) {
      let t2 = this.rules.block.def.exec(e2);
      if (t2) {
        let n2 = t2[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r2 = t2[2] ? t2[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i2 = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
        return { type: "def", tag: n2, raw: $(t2[0], `
`), href: r2, title: i2 };
      }
    }
    table(e2) {
      let t2 = this.rules.block.table.exec(e2);
      if (!t2 || !this.rules.other.tableDelimiter.test(t2[2])) return;
      let n2 = V(t2[1]), r2 = t2[2].replace(this.rules.other.tableAlignChars, "").split("|"), i2 = t2[3]?.trim() ? t2[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s2 = { type: "table", raw: $(t2[0], `
`), header: [], align: [], rows: [] };
      if (n2.length === r2.length) {
        for (let a2 of r2) this.rules.other.tableAlignRight.test(a2) ? s2.align.push("right") : this.rules.other.tableAlignCenter.test(a2) ? s2.align.push("center") : this.rules.other.tableAlignLeft.test(a2) ? s2.align.push("left") : s2.align.push(null);
        for (let a2 = 0; a2 < n2.length; a2++) s2.header.push({ text: n2[a2], tokens: this.lexer.inline(n2[a2]), header: true, align: s2.align[a2] });
        for (let a2 of i2) s2.rows.push(V(a2, s2.header.length).map((o2, l2) => ({ text: o2, tokens: this.lexer.inline(o2), header: false, align: s2.align[l2] })));
        return s2;
      }
    }
    lheading(e2) {
      let t2 = this.rules.block.lheading.exec(e2);
      if (t2) {
        let n2 = t2[1].trim();
        return { type: "heading", raw: $(t2[0], `
`), depth: t2[2].charAt(0) === "=" ? 1 : 2, text: n2, tokens: this.lexer.inline(n2) };
      }
    }
    paragraph(e2) {
      let t2 = this.rules.block.paragraph.exec(e2);
      if (t2) {
        let n2 = t2[1].charAt(t2[1].length - 1) === `
` ? t2[1].slice(0, -1) : t2[1];
        return { type: "paragraph", raw: t2[0], text: n2, tokens: this.lexer.inline(n2) };
      }
    }
    text(e2) {
      let t2 = this.rules.block.text.exec(e2);
      if (t2) return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
    }
    escape(e2) {
      let t2 = this.rules.inline.escape.exec(e2);
      if (t2) return { type: "escape", raw: t2[0], text: t2[1] };
    }
    tag(e2) {
      let t2 = this.rules.inline.tag.exec(e2);
      if (t2) return !this.lexer.state.inLink && this.rules.other.startATag.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
    }
    link(e2) {
      let t2 = this.rules.inline.link.exec(e2);
      if (t2) {
        let n2 = t2[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n2)) {
          if (!this.rules.other.endAngleBracket.test(n2)) return;
          let s2 = $(n2.slice(0, -1), "\\");
          if ((n2.length - s2.length) % 2 === 0) return;
        } else {
          let s2 = ge(t2[2], "()");
          if (s2 === -2) return;
          if (s2 > -1) {
            let o2 = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + s2;
            t2[2] = t2[2].substring(0, s2), t2[0] = t2[0].substring(0, o2).trim(), t2[3] = "";
          }
        }
        let r2 = t2[2], i2 = "";
        if (this.options.pedantic) {
          let s2 = this.rules.other.pedanticHrefTitle.exec(r2);
          s2 && (r2 = s2[1], i2 = s2[3]);
        } else i2 = t2[3] ? t2[3].slice(1, -1) : "";
        return r2 = r2.trim(), this.rules.other.startAngleBracket.test(r2) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n2) ? r2 = r2.slice(1) : r2 = r2.slice(1, -1)), me(t2, { href: r2 && r2.replace(this.rules.inline.anyPunctuation, "$1"), title: i2 && i2.replace(this.rules.inline.anyPunctuation, "$1") }, t2[0], this.lexer, this.rules);
      }
    }
    reflink(e2, t2) {
      let n2;
      if ((n2 = this.rules.inline.reflink.exec(e2)) || (n2 = this.rules.inline.nolink.exec(e2))) {
        let r2 = (n2[2] || n2[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i2 = t2[r2.toLowerCase()];
        if (!i2) {
          let s2 = n2[0].charAt(0);
          return { type: "text", raw: s2, text: s2 };
        }
        return me(n2, i2, n2[0], this.lexer, this.rules);
      }
    }
    emStrong(e2, t2, n2 = "") {
      let r2 = this.rules.inline.emStrongLDelim.exec(e2);
      if (!r2 || !r2[1] && !r2[2] && !r2[3] && !r2[4] || r2[4] && n2.match(this.rules.other.unicodeAlphaNumeric)) return;
      if (!(r2[1] || r2[3] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
        let s2 = [...r2[0]].length - 1, a2, o2, l2 = s2, p2 = 0, c2 = r2[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (c2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s2); (r2 = c2.exec(t2)) !== null; ) {
          if (a2 = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !a2) continue;
          if (o2 = [...a2].length, r2[3] || r2[4]) {
            l2 += o2;
            continue;
          } else if ((r2[5] || r2[6]) && s2 % 3 && !((s2 + o2) % 3)) {
            p2 += o2;
            continue;
          }
          if (l2 -= o2, l2 > 0) continue;
          o2 = Math.min(o2, o2 + l2 + p2);
          let d2 = [...r2[0]][0].length, h2 = e2.slice(0, s2 + r2.index + d2 + o2);
          if (Math.min(s2, o2) % 2) {
            let f2 = h2.slice(1, -1);
            return { type: "em", raw: h2, text: f2, tokens: this.lexer.inlineTokens(f2) };
          }
          let R2 = h2.slice(2, -2);
          return { type: "strong", raw: h2, text: R2, tokens: this.lexer.inlineTokens(R2) };
        }
      }
    }
    codespan(e2) {
      let t2 = this.rules.inline.code.exec(e2);
      if (t2) {
        let n2 = t2[2].replace(this.rules.other.newLineCharGlobal, " "), r2 = this.rules.other.nonSpaceChar.test(n2), i2 = this.rules.other.startingSpaceChar.test(n2) && this.rules.other.endingSpaceChar.test(n2);
        return r2 && i2 && (n2 = n2.substring(1, n2.length - 1)), { type: "codespan", raw: t2[0], text: n2 };
      }
    }
    br(e2) {
      let t2 = this.rules.inline.br.exec(e2);
      if (t2) return { type: "br", raw: t2[0] };
    }
    del(e2, t2, n2 = "") {
      let r2 = this.rules.inline.delLDelim.exec(e2);
      if (!r2) return;
      if (!(r2[1] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
        let s2 = [...r2[0]].length - 1, a2, o2, l2 = s2, p2 = this.rules.inline.delRDelim;
        for (p2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s2); (r2 = p2.exec(t2)) !== null; ) {
          if (a2 = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !a2 || (o2 = [...a2].length, o2 !== s2)) continue;
          if (r2[3] || r2[4]) {
            l2 += o2;
            continue;
          }
          if (l2 -= o2, l2 > 0) continue;
          o2 = Math.min(o2, o2 + l2);
          let c2 = [...r2[0]][0].length, d2 = e2.slice(0, s2 + r2.index + c2 + o2), h2 = d2.slice(s2, -s2);
          return { type: "del", raw: d2, text: h2, tokens: this.lexer.inlineTokens(h2) };
        }
      }
    }
    autolink(e2) {
      let t2 = this.rules.inline.autolink.exec(e2);
      if (t2) {
        let n2, r2;
        return t2[2] === "@" ? (n2 = t2[1], r2 = "mailto:" + n2) : (n2 = t2[1], r2 = n2), { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
      }
    }
    url(e2) {
      let t2;
      if (t2 = this.rules.inline.url.exec(e2)) {
        let n2, r2;
        if (t2[2] === "@") n2 = t2[0], r2 = "mailto:" + n2;
        else {
          let i2;
          do
            i2 = t2[0], t2[0] = this.rules.inline._backpedal.exec(t2[0])?.[0] ?? "";
          while (i2 !== t2[0]);
          n2 = t2[0], t2[1] === "www." ? r2 = "http://" + t2[0] : r2 = t2[0];
        }
        return { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
      }
    }
    inlineText(e2) {
      let t2 = this.rules.inline.text.exec(e2);
      if (t2) {
        let n2 = this.lexer.state.inRawBlock;
        return { type: "text", raw: t2[0], text: t2[0], escaped: n2 };
      }
    }
  };
  var x = class u {
    tokens;
    options;
    state;
    inlineQueue;
    tokenizer;
    constructor(e2) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || T, this.options.tokenizer = this.options.tokenizer || new w(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let t2 = { other: m, block: B.normal, inline: I.normal };
      this.options.pedantic ? (t2.block = B.pedantic, t2.inline = I.pedantic) : this.options.gfm && (t2.block = B.gfm, this.options.breaks ? t2.inline = I.breaks : t2.inline = I.gfm), this.tokenizer.rules = t2;
    }
    static get rules() {
      return { block: B, inline: I };
    }
    static lex(e2, t2) {
      return new u(t2).lex(e2);
    }
    static lexInline(e2, t2) {
      return new u(t2).inlineTokens(e2);
    }
    lex(e2) {
      e2 = e2.replace(m.carriageReturn, `
`), this.blockTokens(e2, this.tokens);
      for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
        let n2 = this.inlineQueue[t2];
        this.inlineTokens(n2.src, n2.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e2, t2 = [], n2 = false) {
      for (this.tokenizer.lexer = this, this.options.pedantic && (e2 = e2.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e2; ) {
        let r2;
        if (this.options.extensions?.block?.some((s2) => (r2 = s2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(r2.raw.length), t2.push(r2), true) : false)) continue;
        if (r2 = this.tokenizer.space(e2)) {
          e2 = e2.substring(r2.raw.length);
          let s2 = t2.at(-1);
          r2.raw.length === 1 && s2 !== void 0 ? s2.raw += `
` : t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.code(e2)) {
          e2 = e2.substring(r2.raw.length);
          let s2 = t2.at(-1);
          s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.fences(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.heading(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.hr(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.blockquote(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.list(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.html(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.def(e2)) {
          e2 = e2.substring(r2.raw.length);
          let s2 = t2.at(-1);
          s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.raw, this.inlineQueue.at(-1).src = s2.text) : this.tokens.links[r2.tag] || (this.tokens.links[r2.tag] = { href: r2.href, title: r2.title }, t2.push(r2));
          continue;
        }
        if (r2 = this.tokenizer.table(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        if (r2 = this.tokenizer.lheading(e2)) {
          e2 = e2.substring(r2.raw.length), t2.push(r2);
          continue;
        }
        let i2 = e2;
        if (this.options.extensions?.startBlock) {
          let s2 = 1 / 0, a2 = e2.slice(1), o2;
          this.options.extensions.startBlock.forEach((l2) => {
            o2 = l2.call({ lexer: this }, a2), typeof o2 == "number" && o2 >= 0 && (s2 = Math.min(s2, o2));
          }), s2 < 1 / 0 && s2 >= 0 && (i2 = e2.substring(0, s2 + 1));
        }
        if (this.state.top && (r2 = this.tokenizer.paragraph(i2))) {
          let s2 = t2.at(-1);
          n2 && s2?.type === "paragraph" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2), n2 = i2.length !== e2.length, e2 = e2.substring(r2.raw.length);
          continue;
        }
        if (r2 = this.tokenizer.text(e2)) {
          e2 = e2.substring(r2.raw.length);
          let s2 = t2.at(-1);
          s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
          continue;
        }
        if (e2) {
          let s2 = "Infinite loop on byte: " + e2.charCodeAt(0);
          if (this.options.silent) {
            console.error(s2);
            break;
          } else throw new Error(s2);
        }
      }
      return this.state.top = true, t2;
    }
    inline(e2, t2 = []) {
      return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
    }
    inlineTokens(e2, t2 = []) {
      this.tokenizer.lexer = this;
      let n2 = e2, r2 = null;
      if (this.tokens.links) {
        let o2 = Object.keys(this.tokens.links);
        if (o2.length > 0) for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(n2)) !== null; ) o2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (n2 = n2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(n2)) !== null; ) n2 = n2.slice(0, r2.index) + "++" + n2.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      let i2;
      for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(n2)) !== null; ) i2 = r2[2] ? r2[2].length : 0, n2 = n2.slice(0, r2.index + i2) + "[" + "a".repeat(r2[0].length - i2 - 2) + "]" + n2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      n2 = this.options.hooks?.emStrongMask?.call({ lexer: this }, n2) ?? n2;
      let s2 = false, a2 = "";
      for (; e2; ) {
        s2 || (a2 = ""), s2 = false;
        let o2;
        if (this.options.extensions?.inline?.some((p2) => (o2 = p2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(o2.raw.length), t2.push(o2), true) : false)) continue;
        if (o2 = this.tokenizer.escape(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.tag(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.link(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.reflink(e2, this.tokens.links)) {
          e2 = e2.substring(o2.raw.length);
          let p2 = t2.at(-1);
          o2.type === "text" && p2?.type === "text" ? (p2.raw += o2.raw, p2.text += o2.text) : t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.emStrong(e2, n2, a2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.codespan(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.br(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.del(e2, n2, a2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (o2 = this.tokenizer.autolink(e2)) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        if (!this.state.inLink && (o2 = this.tokenizer.url(e2))) {
          e2 = e2.substring(o2.raw.length), t2.push(o2);
          continue;
        }
        let l2 = e2;
        if (this.options.extensions?.startInline) {
          let p2 = 1 / 0, c2 = e2.slice(1), d2;
          this.options.extensions.startInline.forEach((h2) => {
            d2 = h2.call({ lexer: this }, c2), typeof d2 == "number" && d2 >= 0 && (p2 = Math.min(p2, d2));
          }), p2 < 1 / 0 && p2 >= 0 && (l2 = e2.substring(0, p2 + 1));
        }
        if (o2 = this.tokenizer.inlineText(l2)) {
          e2 = e2.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (a2 = o2.raw.slice(-1)), s2 = true;
          let p2 = t2.at(-1);
          p2?.type === "text" ? (p2.raw += o2.raw, p2.text += o2.text) : t2.push(o2);
          continue;
        }
        if (e2) {
          let p2 = "Infinite loop on byte: " + e2.charCodeAt(0);
          if (this.options.silent) {
            console.error(p2);
            break;
          } else throw new Error(p2);
        }
      }
      return t2;
    }
  };
  var y = class {
    options;
    parser;
    constructor(e2) {
      this.options = e2 || T;
    }
    space(e2) {
      return "";
    }
    code({ text: e2, lang: t2, escaped: n2 }) {
      let r2 = (t2 || "").match(m.notSpaceStart)?.[0], i2 = e2.replace(m.endingNewline, "") + `
`;
      return r2 ? '<pre><code class="language-' + O(r2) + '">' + (n2 ? i2 : O(i2, true)) + `</code></pre>
` : "<pre><code>" + (n2 ? i2 : O(i2, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e2 }) {
      return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
    }
    html({ text: e2 }) {
      return e2;
    }
    def(e2) {
      return "";
    }
    heading({ tokens: e2, depth: t2 }) {
      return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
    }
    hr(e2) {
      return `<hr>
`;
    }
    list(e2) {
      let t2 = e2.ordered, n2 = e2.start, r2 = "";
      for (let a2 = 0; a2 < e2.items.length; a2++) {
        let o2 = e2.items[a2];
        r2 += this.listitem(o2);
      }
      let i2 = t2 ? "ol" : "ul", s2 = t2 && n2 !== 1 ? ' start="' + n2 + '"' : "";
      return "<" + i2 + s2 + `>
` + r2 + "</" + i2 + `>
`;
    }
    listitem(e2) {
      return `<li>${this.parser.parse(e2.tokens)}</li>
`;
    }
    checkbox({ checked: e2 }) {
      return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: e2 }) {
      return `<p>${this.parser.parseInline(e2)}</p>
`;
    }
    table(e2) {
      let t2 = "", n2 = "";
      for (let i2 = 0; i2 < e2.header.length; i2++) n2 += this.tablecell(e2.header[i2]);
      t2 += this.tablerow({ text: n2 });
      let r2 = "";
      for (let i2 = 0; i2 < e2.rows.length; i2++) {
        let s2 = e2.rows[i2];
        n2 = "";
        for (let a2 = 0; a2 < s2.length; a2++) n2 += this.tablecell(s2[a2]);
        r2 += this.tablerow({ text: n2 });
      }
      return r2 && (r2 = `<tbody>${r2}</tbody>`), `<table>
<thead>
` + t2 + `</thead>
` + r2 + `</table>
`;
    }
    tablerow({ text: e2 }) {
      return `<tr>
${e2}</tr>
`;
    }
    tablecell(e2) {
      let t2 = this.parser.parseInline(e2.tokens), n2 = e2.header ? "th" : "td";
      return (e2.align ? `<${n2} align="${e2.align}">` : `<${n2}>`) + t2 + `</${n2}>
`;
    }
    strong({ tokens: e2 }) {
      return `<strong>${this.parser.parseInline(e2)}</strong>`;
    }
    em({ tokens: e2 }) {
      return `<em>${this.parser.parseInline(e2)}</em>`;
    }
    codespan({ text: e2 }) {
      return `<code>${O(e2, true)}</code>`;
    }
    br(e2) {
      return "<br>";
    }
    del({ tokens: e2 }) {
      return `<del>${this.parser.parseInline(e2)}</del>`;
    }
    link({ href: e2, title: t2, tokens: n2 }) {
      let r2 = this.parser.parseInline(n2), i2 = J(e2);
      if (i2 === null) return r2;
      e2 = i2;
      let s2 = '<a href="' + e2 + '"';
      return t2 && (s2 += ' title="' + O(t2) + '"'), s2 += ">" + r2 + "</a>", s2;
    }
    image({ href: e2, title: t2, text: n2, tokens: r2 }) {
      r2 && (n2 = this.parser.parseInline(r2, this.parser.textRenderer));
      let i2 = J(e2);
      if (i2 === null) return O(n2);
      e2 = i2;
      let s2 = `<img src="${e2}" alt="${O(n2)}"`;
      return t2 && (s2 += ` title="${O(t2)}"`), s2 += ">", s2;
    }
    text(e2) {
      return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : "escaped" in e2 && e2.escaped ? e2.text : O(e2.text);
    }
  };
  var L = class {
    strong({ text: e2 }) {
      return e2;
    }
    em({ text: e2 }) {
      return e2;
    }
    codespan({ text: e2 }) {
      return e2;
    }
    del({ text: e2 }) {
      return e2;
    }
    html({ text: e2 }) {
      return e2;
    }
    text({ text: e2 }) {
      return e2;
    }
    link({ text: e2 }) {
      return "" + e2;
    }
    image({ text: e2 }) {
      return "" + e2;
    }
    br() {
      return "";
    }
    checkbox({ raw: e2 }) {
      return e2;
    }
  };
  var b = class u2 {
    options;
    renderer;
    textRenderer;
    constructor(e2) {
      this.options = e2 || T, this.options.renderer = this.options.renderer || new y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
    }
    static parse(e2, t2) {
      return new u2(t2).parse(e2);
    }
    static parseInline(e2, t2) {
      return new u2(t2).parseInline(e2);
    }
    parse(e2) {
      this.renderer.parser = this;
      let t2 = "";
      for (let n2 = 0; n2 < e2.length; n2++) {
        let r2 = e2[n2];
        if (this.options.extensions?.renderers?.[r2.type]) {
          let s2 = r2, a2 = this.options.extensions.renderers[s2.type].call({ parser: this }, s2);
          if (a2 !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s2.type)) {
            t2 += a2 || "";
            continue;
          }
        }
        let i2 = r2;
        switch (i2.type) {
          case "space": {
            t2 += this.renderer.space(i2);
            break;
          }
          case "hr": {
            t2 += this.renderer.hr(i2);
            break;
          }
          case "heading": {
            t2 += this.renderer.heading(i2);
            break;
          }
          case "code": {
            t2 += this.renderer.code(i2);
            break;
          }
          case "table": {
            t2 += this.renderer.table(i2);
            break;
          }
          case "blockquote": {
            t2 += this.renderer.blockquote(i2);
            break;
          }
          case "list": {
            t2 += this.renderer.list(i2);
            break;
          }
          case "checkbox": {
            t2 += this.renderer.checkbox(i2);
            break;
          }
          case "html": {
            t2 += this.renderer.html(i2);
            break;
          }
          case "def": {
            t2 += this.renderer.def(i2);
            break;
          }
          case "paragraph": {
            t2 += this.renderer.paragraph(i2);
            break;
          }
          case "text": {
            t2 += this.renderer.text(i2);
            break;
          }
          default: {
            let s2 = 'Token with "' + i2.type + '" type was not found.';
            if (this.options.silent) return console.error(s2), "";
            throw new Error(s2);
          }
        }
      }
      return t2;
    }
    parseInline(e2, t2 = this.renderer) {
      this.renderer.parser = this;
      let n2 = "";
      for (let r2 = 0; r2 < e2.length; r2++) {
        let i2 = e2[r2];
        if (this.options.extensions?.renderers?.[i2.type]) {
          let a2 = this.options.extensions.renderers[i2.type].call({ parser: this }, i2);
          if (a2 !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i2.type)) {
            n2 += a2 || "";
            continue;
          }
        }
        let s2 = i2;
        switch (s2.type) {
          case "escape": {
            n2 += t2.text(s2);
            break;
          }
          case "html": {
            n2 += t2.html(s2);
            break;
          }
          case "link": {
            n2 += t2.link(s2);
            break;
          }
          case "image": {
            n2 += t2.image(s2);
            break;
          }
          case "checkbox": {
            n2 += t2.checkbox(s2);
            break;
          }
          case "strong": {
            n2 += t2.strong(s2);
            break;
          }
          case "em": {
            n2 += t2.em(s2);
            break;
          }
          case "codespan": {
            n2 += t2.codespan(s2);
            break;
          }
          case "br": {
            n2 += t2.br(s2);
            break;
          }
          case "del": {
            n2 += t2.del(s2);
            break;
          }
          case "text": {
            n2 += t2.text(s2);
            break;
          }
          default: {
            let a2 = 'Token with "' + s2.type + '" type was not found.';
            if (this.options.silent) return console.error(a2), "";
            throw new Error(a2);
          }
        }
      }
      return n2;
    }
  };
  var P = class {
    options;
    block;
    constructor(e2) {
      this.options = e2 || T;
    }
    static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
    static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(e2) {
      return e2;
    }
    postprocess(e2) {
      return e2;
    }
    processAllTokens(e2) {
      return e2;
    }
    emStrongMask(e2) {
      return e2;
    }
    provideLexer(e2 = this.block) {
      return e2 ? x.lex : x.lexInline;
    }
    provideParser(e2 = this.block) {
      return e2 ? b.parse : b.parseInline;
    }
  };
  var D = class {
    defaults = z();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = b;
    Renderer = y;
    TextRenderer = L;
    Lexer = x;
    Tokenizer = w;
    Hooks = P;
    constructor(...e2) {
      this.use(...e2);
    }
    walkTokens(e2, t2) {
      let n2 = [];
      for (let r2 of e2) switch (n2 = n2.concat(t2.call(this, r2)), r2.type) {
        case "table": {
          let i2 = r2;
          for (let s2 of i2.header) n2 = n2.concat(this.walkTokens(s2.tokens, t2));
          for (let s2 of i2.rows) for (let a2 of s2) n2 = n2.concat(this.walkTokens(a2.tokens, t2));
          break;
        }
        case "list": {
          let i2 = r2;
          n2 = n2.concat(this.walkTokens(i2.items, t2));
          break;
        }
        default: {
          let i2 = r2;
          this.defaults.extensions?.childTokens?.[i2.type] ? this.defaults.extensions.childTokens[i2.type].forEach((s2) => {
            let a2 = i2[s2].flat(1 / 0);
            n2 = n2.concat(this.walkTokens(a2, t2));
          }) : i2.tokens && (n2 = n2.concat(this.walkTokens(i2.tokens, t2)));
        }
      }
      return n2;
    }
    use(...e2) {
      let t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e2.forEach((n2) => {
        let r2 = { ...n2 };
        if (r2.async = this.defaults.async || r2.async || false, n2.extensions && (n2.extensions.forEach((i2) => {
          if (!i2.name) throw new Error("extension name required");
          if ("renderer" in i2) {
            let s2 = t2.renderers[i2.name];
            s2 ? t2.renderers[i2.name] = function(...a2) {
              let o2 = i2.renderer.apply(this, a2);
              return o2 === false && (o2 = s2.apply(this, a2)), o2;
            } : t2.renderers[i2.name] = i2.renderer;
          }
          if ("tokenizer" in i2) {
            if (!i2.level || i2.level !== "block" && i2.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            let s2 = t2[i2.level];
            s2 ? s2.unshift(i2.tokenizer) : t2[i2.level] = [i2.tokenizer], i2.start && (i2.level === "block" ? t2.startBlock ? t2.startBlock.push(i2.start) : t2.startBlock = [i2.start] : i2.level === "inline" && (t2.startInline ? t2.startInline.push(i2.start) : t2.startInline = [i2.start]));
          }
          "childTokens" in i2 && i2.childTokens && (t2.childTokens[i2.name] = i2.childTokens);
        }), r2.extensions = t2), n2.renderer) {
          let i2 = this.defaults.renderer || new y(this.defaults);
          for (let s2 in n2.renderer) {
            if (!(s2 in i2)) throw new Error(`renderer '${s2}' does not exist`);
            if (["options", "parser"].includes(s2)) continue;
            let a2 = s2, o2 = n2.renderer[a2], l2 = i2[a2];
            i2[a2] = (...p2) => {
              let c2 = o2.apply(i2, p2);
              return c2 === false && (c2 = l2.apply(i2, p2)), c2 || "";
            };
          }
          r2.renderer = i2;
        }
        if (n2.tokenizer) {
          let i2 = this.defaults.tokenizer || new w(this.defaults);
          for (let s2 in n2.tokenizer) {
            if (!(s2 in i2)) throw new Error(`tokenizer '${s2}' does not exist`);
            if (["options", "rules", "lexer"].includes(s2)) continue;
            let a2 = s2, o2 = n2.tokenizer[a2], l2 = i2[a2];
            i2[a2] = (...p2) => {
              let c2 = o2.apply(i2, p2);
              return c2 === false && (c2 = l2.apply(i2, p2)), c2;
            };
          }
          r2.tokenizer = i2;
        }
        if (n2.hooks) {
          let i2 = this.defaults.hooks || new P();
          for (let s2 in n2.hooks) {
            if (!(s2 in i2)) throw new Error(`hook '${s2}' does not exist`);
            if (["options", "block"].includes(s2)) continue;
            let a2 = s2, o2 = n2.hooks[a2], l2 = i2[a2];
            P.passThroughHooks.has(s2) ? i2[a2] = (p2) => {
              if (this.defaults.async && P.passThroughHooksRespectAsync.has(s2)) return (async () => {
                let d2 = await o2.call(i2, p2);
                return l2.call(i2, d2);
              })();
              let c2 = o2.call(i2, p2);
              return l2.call(i2, c2);
            } : i2[a2] = (...p2) => {
              if (this.defaults.async) return (async () => {
                let d2 = await o2.apply(i2, p2);
                return d2 === false && (d2 = await l2.apply(i2, p2)), d2;
              })();
              let c2 = o2.apply(i2, p2);
              return c2 === false && (c2 = l2.apply(i2, p2)), c2;
            };
          }
          r2.hooks = i2;
        }
        if (n2.walkTokens) {
          let i2 = this.defaults.walkTokens, s2 = n2.walkTokens;
          r2.walkTokens = function(a2) {
            let o2 = [];
            return o2.push(s2.call(this, a2)), i2 && (o2 = o2.concat(i2.call(this, a2))), o2;
          };
        }
        this.defaults = { ...this.defaults, ...r2 };
      }), this;
    }
    setOptions(e2) {
      return this.defaults = { ...this.defaults, ...e2 }, this;
    }
    lexer(e2, t2) {
      return x.lex(e2, t2 ?? this.defaults);
    }
    parser(e2, t2) {
      return b.parse(e2, t2 ?? this.defaults);
    }
    parseMarkdown(e2) {
      return (n2, r2) => {
        let i2 = { ...r2 }, s2 = { ...this.defaults, ...i2 }, a2 = this.onError(!!s2.silent, !!s2.async);
        if (this.defaults.async === true && i2.async === false) return a2(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof n2 > "u" || n2 === null) return a2(new Error("marked(): input parameter is undefined or null"));
        if (typeof n2 != "string") return a2(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n2) + ", string expected"));
        if (s2.hooks && (s2.hooks.options = s2, s2.hooks.block = e2), s2.async) return (async () => {
          let o2 = s2.hooks ? await s2.hooks.preprocess(n2) : n2, p2 = await (s2.hooks ? await s2.hooks.provideLexer(e2) : e2 ? x.lex : x.lexInline)(o2, s2), c2 = s2.hooks ? await s2.hooks.processAllTokens(p2) : p2;
          s2.walkTokens && await Promise.all(this.walkTokens(c2, s2.walkTokens));
          let h2 = await (s2.hooks ? await s2.hooks.provideParser(e2) : e2 ? b.parse : b.parseInline)(c2, s2);
          return s2.hooks ? await s2.hooks.postprocess(h2) : h2;
        })().catch(a2);
        try {
          s2.hooks && (n2 = s2.hooks.preprocess(n2));
          let l2 = (s2.hooks ? s2.hooks.provideLexer(e2) : e2 ? x.lex : x.lexInline)(n2, s2);
          s2.hooks && (l2 = s2.hooks.processAllTokens(l2)), s2.walkTokens && this.walkTokens(l2, s2.walkTokens);
          let c2 = (s2.hooks ? s2.hooks.provideParser(e2) : e2 ? b.parse : b.parseInline)(l2, s2);
          return s2.hooks && (c2 = s2.hooks.postprocess(c2)), c2;
        } catch (o2) {
          return a2(o2);
        }
      };
    }
    onError(e2, t2) {
      return (n2) => {
        if (n2.message += `
Please report this to https://github.com/markedjs/marked.`, e2) {
          let r2 = "<p>An error occurred:</p><pre>" + O(n2.message + "", true) + "</pre>";
          return t2 ? Promise.resolve(r2) : r2;
        }
        if (t2) return Promise.reject(n2);
        throw n2;
      };
    }
  };
  var M = new D();
  function g(u4, e2) {
    return M.parse(u4, e2);
  }
  g.options = g.setOptions = function(u4) {
    return M.setOptions(u4), g.defaults = M.defaults, G(g.defaults), g;
  };
  g.getDefaults = z;
  g.defaults = T;
  g.use = function(...u4) {
    return M.use(...u4), g.defaults = M.defaults, G(g.defaults), g;
  };
  g.walkTokens = function(u4, e2) {
    return M.walkTokens(u4, e2);
  };
  g.parseInline = M.parseInline;
  g.Parser = b;
  g.parser = b.parse;
  g.Renderer = y;
  g.TextRenderer = L;
  g.Lexer = x;
  g.lexer = x.lex;
  g.Tokenizer = w;
  g.Hooks = P;
  g.parse = g;
  var jt = g.options;
  var Ft = g.setOptions;
  var Ut = g.use;
  var Kt = g.walkTokens;
  var Wt = g.parseInline;
  var Jt = b.parse;
  var Vt = x.lex;

  // src/scripts/index.ts
  var import_semver = __toESM(require_semver2(), 1);

  // node_modules/temporal-polyfill/chunks/internal.js
  function clampProp(e2, n2, t2, o2, r2) {
    return ba(n2, ((e3, n3) => {
      const t3 = e3[n3];
      if (void 0 === t3) {
        throw new TypeError(missingField(n3));
      }
      return t3;
    })(e2, n2), t2, o2, r2);
  }
  function ba(e2, n2, t2, o2, r2, i2) {
    const a2 = clampNumber(n2, t2, o2);
    if (r2 && n2 !== a2) {
      throw new RangeError(numberOutOfRange(e2, n2, t2, o2, i2));
    }
    return a2;
  }
  function s(e2) {
    return null !== e2 && /object|function/.test(typeof e2);
  }
  function on(e2, n2 = Map) {
    const t2 = new n2();
    return (n3, ...o2) => {
      if (t2.has(n3)) {
        return t2.get(n3);
      }
      const r2 = e2(n3, ...o2);
      return t2.set(n3, r2), r2;
    };
  }
  function r(e2) {
    return n({
      name: e2
    }, 1);
  }
  function n(n2, t2) {
    return e(((e2) => ({
      value: e2,
      configurable: 1,
      writable: !t2
    })), n2);
  }
  function t(n2) {
    return e(((e2) => ({
      get: e2,
      configurable: 1
    })), n2);
  }
  function o(e2) {
    return {
      [Symbol.toStringTag]: {
        value: e2,
        configurable: 1
      }
    };
  }
  function zipProps(e2, n2) {
    const t2 = {};
    let o2 = e2.length;
    for (const r2 of n2) {
      t2[e2[--o2]] = r2;
    }
    return t2;
  }
  function e(e2, n2, t2) {
    const o2 = {};
    for (const r2 in n2) {
      o2[r2] = e2(n2[r2], r2, t2);
    }
    return o2;
  }
  function P2(e2, n2, t2) {
    const o2 = {};
    for (let r2 = 0; r2 < n2.length; r2++) {
      const i2 = n2[r2];
      o2[i2] = e2(i2, r2, t2);
    }
    return o2;
  }
  function remapProps(e2, n2, t2) {
    const o2 = {};
    for (let r2 = 0; r2 < e2.length; r2++) {
      o2[n2[r2]] = t2[e2[r2]];
    }
    return o2;
  }
  function nn(e2, n2) {
    const t2 = /* @__PURE__ */ Object.create(null);
    for (const o2 of e2) {
      t2[o2] = n2[o2];
    }
    return t2;
  }
  function hasAnyPropsByName(e2, n2) {
    for (const t2 of n2) {
      if (t2 in e2) {
        return 1;
      }
    }
    return 0;
  }
  function allPropsEqual(e2, n2, t2) {
    for (const o2 of e2) {
      if (n2[o2] !== t2[o2]) {
        return 0;
      }
    }
    return 1;
  }
  function zeroOutProps(e2, n2, t2) {
    const o2 = {
      ...t2
    };
    for (let t3 = 0; t3 < n2; t3++) {
      o2[e2[t3]] = 0;
    }
    return o2;
  }
  function gt(e2, ...n2) {
    return (...t2) => e2(...n2, ...t2);
  }
  function noop() {
  }
  function capitalize(e2) {
    return e2[0].toUpperCase() + e2.substring(1);
  }
  function sortStrings(e2) {
    return e2.slice().sort();
  }
  function padNumber(e2, n2) {
    return String(n2).padStart(e2, "0");
  }
  function compareNumbers(e2, n2) {
    return Math.sign(e2 - n2);
  }
  function clampNumber(e2, n2, t2) {
    return Math.min(Math.max(e2, n2), t2);
  }
  function divModFloor(e2, n2) {
    return [Math.floor(e2 / n2), modFloor(e2, n2)];
  }
  function modFloor(e2, n2) {
    return (e2 % n2 + n2) % n2;
  }
  function divModTrunc(e2, n2) {
    return [divTrunc(e2, n2), modTrunc(e2, n2)];
  }
  function divTrunc(e2, n2) {
    return Math.trunc(e2 / n2) || 0;
  }
  function modTrunc(e2, n2) {
    return e2 % n2 || 0;
  }
  function hasHalf(e2) {
    return 0.5 === Math.abs(e2 % 1);
  }
  function givenFieldsToBigNano(e2, n2, t2) {
    let o2 = 0, r2 = 0;
    for (let i3 = 0; i3 <= n2; i3++) {
      const n3 = e2[t2[i3]], a3 = Zu[i3], s2 = go / a3, [c2, u4] = divModTrunc(n3, s2);
      o2 += u4 * a3, r2 += c2;
    }
    const [i2, a2] = divModTrunc(o2, go);
    return [r2 + i2, a2];
  }
  function nanoToGivenFields(e2, n2, t2) {
    const o2 = {};
    for (let r2 = n2; r2 >= 0; r2--) {
      const n3 = Zu[r2];
      o2[t2[r2]] = divTrunc(e2, n3), e2 = modTrunc(e2, n3);
    }
    return o2;
  }
  function m2(e2) {
    if (void 0 !== e2) {
      return d(e2);
    }
  }
  function g2(e2) {
    if (void 0 !== e2) {
      return h(e2);
    }
  }
  function S(e2) {
    if (void 0 !== e2) {
      return T2(e2);
    }
  }
  function h(e2) {
    return requireNumberIsPositive(T2(e2));
  }
  function T2(e2) {
    return _e2(rl(e2));
  }
  function requirePropDefined(e2, n2) {
    if (null == n2) {
      throw new RangeError(missingField(e2));
    }
    return n2;
  }
  function oa(e2) {
    if (!s(e2)) {
      throw new TypeError(ru);
    }
    return e2;
  }
  function requireType(e2, n2, t2 = e2) {
    if (typeof n2 !== e2) {
      throw new TypeError(invalidEntity(t2, n2));
    }
    return n2;
  }
  function _e2(e2, n2 = "number") {
    if (!Number.isInteger(e2)) {
      throw new RangeError(expectedInteger(n2, e2));
    }
    return e2 || 0;
  }
  function requireNumberIsPositive(e2, n2 = "number") {
    if (e2 <= 0) {
      throw new RangeError(expectedPositive(n2, e2));
    }
    return e2;
  }
  function tu(e2) {
    if ("symbol" == typeof e2) {
      throw new TypeError(ou);
    }
    return String(e2);
  }
  function toStringViaPrimitive(e2, n2) {
    return s(e2) ? String(e2) : d(e2, n2);
  }
  function toBigInt(e2) {
    if ("string" == typeof e2) {
      return BigInt(e2);
    }
    if ("bigint" != typeof e2) {
      throw new TypeError(invalidBigInt(e2));
    }
    return e2;
  }
  function toNumber(e2, n2 = "number") {
    if ("bigint" == typeof e2) {
      throw new TypeError(forbiddenBigIntToNumber(n2));
    }
    if (e2 = Number(e2), !Number.isFinite(e2)) {
      throw new RangeError(expectedFinite(n2, e2));
    }
    return e2;
  }
  function Za(e2, n2) {
    return Math.trunc(toNumber(e2, n2)) || 0;
  }
  function Ba(e2, n2) {
    return _e2(toNumber(e2, n2), n2);
  }
  function toPositiveInteger(e2, n2) {
    return requireNumberIsPositive(Za(e2, n2), n2);
  }
  function createBigNano(e2, n2) {
    let [t2, o2] = divModTrunc(n2, go), r2 = e2 + t2;
    const i2 = Math.sign(r2);
    return i2 && i2 === -Math.sign(o2) && (r2 -= i2, o2 += i2 * go), [r2, o2];
  }
  function so(e2, n2, t2 = 1) {
    return createBigNano(e2[0] + n2[0] * t2, e2[1] + n2[1] * t2);
  }
  function Ta(e2, n2) {
    return createBigNano(e2[0], e2[1] + n2);
  }
  function va(e2, n2) {
    return so(n2, e2, -1);
  }
  function pa(e2, n2) {
    return compareNumbers(e2[0], n2[0]) || compareNumbers(e2[1], n2[1]);
  }
  function bigNanoOutside(e2, n2, t2) {
    return -1 === pa(e2, n2) || 1 === pa(e2, t2);
  }
  function bigIntToBigNano(e2, n2 = 1) {
    const t2 = BigInt(go / n2);
    return [Number(e2 / t2), Number(e2 % t2) * n2];
  }
  function Ge2(e2, n2 = 1) {
    const t2 = go / n2, [o2, r2] = divModTrunc(e2, t2);
    return [o2, r2 * n2];
  }
  function bigNanoToBigInt(e2, n2 = 1) {
    const [t2, o2] = e2, r2 = Math.floor(o2 / n2), i2 = go / n2;
    return BigInt(t2) * BigInt(i2) + BigInt(r2);
  }
  function La(e2, n2 = 1, t2) {
    const [o2, r2] = e2, [i2, a2] = divModTrunc(r2, n2);
    return o2 * (go / n2) + (i2 + (t2 ? a2 / n2 : 0));
  }
  function Oa(e2) {
    return e2[0] + e2[1] / go;
  }
  function divModBigNano(e2, n2, t2 = divModFloor) {
    const [o2, r2] = e2, [i2, a2] = t2(r2, n2);
    return [o2 * (go / n2) + i2, a2];
  }
  function checkIsoYearMonthInBounds(e2) {
    return clampProp(e2, "isoYear", Nl, yl, 1), e2.isoYear === Nl ? clampProp(e2, "isoMonth", 4, 12, 1) : e2.isoYear === yl && clampProp(e2, "isoMonth", 1, 9, 1), e2;
  }
  function To(e2) {
    return Do({
      ...e2,
      ...At,
      isoHour: 12
    }), e2;
  }
  function Do(e2) {
    const n2 = clampProp(e2, "isoYear", Nl, yl, 1), t2 = n2 === Nl ? 1 : n2 === yl ? -1 : 0;
    return t2 && io(ma({
      ...e2,
      isoDay: e2.isoDay + t2,
      isoNanosecond: e2.isoNanosecond - t2
    })), e2;
  }
  function io(e2) {
    if (!e2 || bigNanoOutside(e2, Ml, Tl)) {
      throw new RangeError(Mu);
    }
    return e2;
  }
  function isoTimeFieldsToNano(e2) {
    return givenFieldsToBigNano(e2, 5, w2)[1];
  }
  function nanoToIsoTimeAndDay(e2) {
    const [n2, t2] = divModFloor(e2, go);
    return [nanoToGivenFields(t2, 5, w2), n2];
  }
  function epochNanoToSec(e2) {
    return epochNanoToSecMod(e2)[0];
  }
  function epochNanoToSecMod(e2) {
    return divModBigNano(e2, oo);
  }
  function isoToEpochMilli(e2) {
    return isoArgsToEpochMilli(e2.isoYear, e2.isoMonth, e2.isoDay, e2.isoHour, e2.isoMinute, e2.isoSecond, e2.isoMillisecond);
  }
  function ma(e2) {
    const n2 = isoToEpochMilli(e2);
    if (void 0 !== n2) {
      const [t2, o2] = divModTrunc(n2, Cu);
      return [t2, o2 * Ke2 + (e2.isoMicrosecond || 0) * ro + (e2.isoNanosecond || 0)];
    }
  }
  function isoToEpochNanoWithOffset(e2, n2) {
    const [t2, o2] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e2) - n2);
    return io(ma({
      ...e2,
      isoDay: e2.isoDay + o2,
      ...t2
    }));
  }
  function isoArgsToEpochSec(...e2) {
    return isoArgsToEpochMilli(...e2) / ku;
  }
  function isoArgsToEpochMilli(...e2) {
    const [n2, t2] = isoToLegacyDate(...e2), o2 = n2.valueOf();
    if (!isNaN(o2)) {
      return o2 - t2 * Cu;
    }
  }
  function isoToLegacyDate(e2, n2 = 1, t2 = 1, o2 = 0, r2 = 0, i2 = 0, a2 = 0) {
    const s2 = e2 === Nl ? 1 : e2 === yl ? -1 : 0, c2 = /* @__PURE__ */ new Date();
    return c2.setUTCHours(o2, r2, i2, a2), c2.setUTCFullYear(e2, n2 - 1, t2 + s2), [c2, s2];
  }
  function So(e2, n2) {
    let [t2, o2] = Ta(e2, n2);
    o2 < 0 && (o2 += go, t2 -= 1);
    const [r2, i2] = divModFloor(o2, Ke2), [a2, s2] = divModFloor(i2, ro);
    return Pa(t2 * Cu + r2, a2, s2);
  }
  function Pa(e2, n2 = 0, t2 = 0) {
    const o2 = Math.ceil(Math.max(0, Math.abs(e2) - gl) / Cu) * Math.sign(e2), r2 = new Date(e2 - o2 * Cu);
    return zipProps(pl, [r2.getUTCFullYear(), r2.getUTCMonth() + 1, r2.getUTCDate() + o2, r2.getUTCHours(), r2.getUTCMinutes(), r2.getUTCSeconds(), r2.getUTCMilliseconds(), n2, t2]);
  }
  function hashIntlFormatParts(e2, n2) {
    if (n2 < -gl) {
      throw new RangeError(Mu);
    }
    const t2 = e2.formatToParts(n2), o2 = {};
    for (const e3 of t2) {
      o2[e3.type] = e3.value;
    }
    return o2;
  }
  function computeIsoDay(e2) {
    return e2.isoDay;
  }
  function computeIsoDateParts(e2) {
    return [e2.isoYear, e2.isoMonth, e2.isoDay];
  }
  function computeIsoMonthCodeParts(e2, n2) {
    return [n2, 0];
  }
  function computeIsoYearMonthForMonthDay(e2, n2) {
    if (!n2) {
      return [Pl, e2];
    }
  }
  function computeIsoFieldsFromParts(e2, n2, t2) {
    return {
      isoYear: e2,
      isoMonth: n2,
      isoDay: t2
    };
  }
  function fo() {
    return 7;
  }
  function computeIsoMonthsInYear() {
    return Fl;
  }
  function computeIsoDaysInMonth(e2, n2) {
    switch (n2) {
      case 2:
        return computeIsoInLeapYear(e2) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
    }
    return 31;
  }
  function computeIsoDaysInYear(e2) {
    return computeIsoInLeapYear(e2) ? 366 : 365;
  }
  function computeIsoInLeapYear(e2) {
    return e2 % 4 == 0 && (e2 % 100 != 0 || e2 % 400 == 0);
  }
  function Ha(e2) {
    const [n2, t2] = isoToLegacyDate(e2.isoYear, e2.isoMonth, e2.isoDay);
    return modFloor(n2.getUTCDay() - t2, 7) || 7;
  }
  function computeIsoEraParts(e2) {
    return this.id === Xu ? (({ isoYear: e3 }) => e3 < 1 ? ["gregory-inverse", 1 - e3] : ["gregory", e3])(e2) : this.id === el ? Ol(e2) : [];
  }
  function computeJapaneseEraParts(e2) {
    const n2 = isoToEpochMilli(e2);
    if (n2 < El) {
      const { isoYear: n3 } = e2;
      return n3 < 1 ? ["japanese-inverse", 1 - n3] : ["japanese", n3];
    }
    const t2 = hashIntlFormatParts(bf(el), n2), { era: o2, eraYear: r2 } = parseIntlYear(t2, el);
    return [o2, r2];
  }
  function checkIsoDateTimeFields(e2) {
    return checkIsoDateFields(e2), constrainIsoTimeFields(e2, 1), e2;
  }
  function checkIsoDateFields(e2) {
    return constrainIsoDateFields(e2, 1), e2;
  }
  function isIsoDateFieldsValid(e2) {
    return allPropsEqual(ml, e2, constrainIsoDateFields(e2));
  }
  function constrainIsoDateFields(e2, n2) {
    const { isoYear: t2 } = e2, o2 = clampProp(e2, "isoMonth", 1, computeIsoMonthsInYear(), n2);
    return {
      isoYear: t2,
      isoMonth: o2,
      isoDay: clampProp(e2, "isoDay", 1, computeIsoDaysInMonth(t2, o2), n2)
    };
  }
  function constrainIsoTimeFields(e2, n2) {
    return zipProps(w2, [clampProp(e2, "isoHour", 0, 23, n2), clampProp(e2, "isoMinute", 0, 59, n2), clampProp(e2, "isoSecond", 0, 59, n2), clampProp(e2, "isoMillisecond", 0, 999, n2), clampProp(e2, "isoMicrosecond", 0, 999, n2), clampProp(e2, "isoNanosecond", 0, 999, n2)]);
  }
  function dt(e2) {
    return void 0 === e2 ? 0 : Gl(oa(e2));
  }
  function je2(e2, n2 = 0) {
    e2 = normalizeOptions(e2);
    const t2 = Vl(e2), o2 = _l(e2, n2);
    return [Gl(e2), o2, t2];
  }
  function refineDiffOptions(e2, n2, t2, o2 = 9, r2 = 0, i2 = 4) {
    n2 = normalizeOptions(n2);
    let a2 = $l(n2, o2, r2), s2 = parseRoundingIncInteger(n2), c2 = Xl(n2, i2);
    const u4 = xl(n2, o2, r2, 1);
    return null == a2 ? a2 = Math.max(t2, u4) : checkLargestSmallestUnit(a2, u4), s2 = refineRoundingInc(s2, u4, 1), e2 && (c2 = ((e3) => e3 < 4 ? (e3 + 2) % 4 : e3)(c2)), [a2, u4, s2, c2];
  }
  function refineRoundingOptions(e2, n2 = 6, t2) {
    let o2 = parseRoundingIncInteger(e2 = normalizeOptionsOrString(e2, bl));
    const r2 = Xl(e2, 7);
    let i2 = xl(e2, n2);
    return i2 = requirePropDefined(bl, i2), o2 = refineRoundingInc(o2, i2, void 0, t2), [i2, o2, r2];
  }
  function refineDateDisplayOptions(e2) {
    return Jl(normalizeOptions(e2));
  }
  function refineTimeDisplayOptions(e2, n2) {
    return refineTimeDisplayTuple(normalizeOptions(e2), n2);
  }
  function Ze2(e2) {
    const n2 = normalizeOptionsOrString(e2, kl), t2 = refineChoiceOption(kl, Wl, n2, 0);
    if (!t2) {
      throw new RangeError(invalidEntity(kl, t2));
    }
    return t2;
  }
  function refineTimeDisplayTuple(e2, n2 = 4) {
    const t2 = refineSubsecDigits(e2);
    return [Xl(e2, 4), ...refineSmallestUnitAndSubsecDigits(xl(e2, n2), t2)];
  }
  function refineSmallestUnitAndSubsecDigits(e2, n2) {
    return null != e2 ? [Zu[e2], e2 < 4 ? 9 - 3 * e2 : -1] : [void 0 === n2 ? 1 : 10 ** (9 - n2), n2];
  }
  function parseRoundingIncInteger(e2) {
    const n2 = e2[Bl];
    return void 0 === n2 ? 1 : Za(n2, Bl);
  }
  function refineRoundingInc(e2, n2, t2, o2) {
    const r2 = o2 ? go : Zu[n2 + 1];
    if (r2) {
      const t3 = Zu[n2];
      if (r2 % ((e2 = ba(Bl, e2, 1, r2 / t3 - (o2 ? 0 : 1), 1)) * t3)) {
        throw new RangeError(invalidEntity(Bl, e2));
      }
    } else {
      e2 = ba(Bl, e2, 1, t2 ? 10 ** 9 : 1, 1);
    }
    return e2;
  }
  function refineSubsecDigits(e2) {
    let n2 = e2[Yl];
    if (void 0 !== n2) {
      if ("number" != typeof n2) {
        if ("auto" === tu(n2)) {
          return;
        }
        throw new RangeError(invalidEntity(Yl, n2));
      }
      n2 = ba(Yl, Math.floor(n2), 0, 9, 1);
    }
    return n2;
  }
  function normalizeOptions(e2) {
    return void 0 === e2 ? {} : oa(e2);
  }
  function normalizeOptionsOrString(e2, n2) {
    return "string" == typeof e2 ? {
      [n2]: e2
    } : oa(e2);
  }
  function fabricateOverflowOptions(e2) {
    return {
      overflow: Rl[e2]
    };
  }
  function refineUnitOption(e2, n2, t2 = 9, o2 = 0, r2) {
    let i2 = n2[e2];
    if (void 0 === i2) {
      return r2 ? o2 : void 0;
    }
    if (i2 = tu(i2), "auto" === i2) {
      return r2 ? o2 : null;
    }
    let a2 = Bu[i2];
    if (void 0 === a2 && (a2 = ul[i2]), void 0 === a2) {
      throw new RangeError(invalidChoice(e2, i2, Bu));
    }
    return ba(e2, a2, o2, t2, 1, Yu), a2;
  }
  function refineChoiceOption(e2, n2, t2, o2 = 0) {
    const r2 = t2[e2];
    if (void 0 === r2) {
      return o2;
    }
    const i2 = tu(r2), a2 = n2[i2];
    if (void 0 === a2) {
      throw new RangeError(invalidChoice(e2, i2, n2));
    }
    return a2;
  }
  function checkLargestSmallestUnit(e2, n2) {
    if (n2 > e2) {
      throw new RangeError(Eu);
    }
  }
  function xe(e2) {
    return {
      branding: Re2,
      epochNanoseconds: e2
    };
  }
  function Xe2(e2, n2, t2) {
    return {
      branding: _2,
      calendar: t2,
      timeZone: n2,
      epochNanoseconds: e2
    };
  }
  function jt2(e2, n2 = e2.calendar) {
    return {
      branding: x2,
      calendar: n2,
      ...nn(Il, e2)
    };
  }
  function W2(e2, n2 = e2.calendar) {
    return {
      branding: G2,
      calendar: n2,
      ...nn(Ca, e2)
    };
  }
  function createPlainYearMonthSlots(e2, n2 = e2.calendar) {
    return {
      branding: Qt,
      calendar: n2,
      ...nn(Ca, e2)
    };
  }
  function createPlainMonthDaySlots(e2, n2 = e2.calendar) {
    return {
      branding: qt,
      calendar: n2,
      ...nn(Ca, e2)
    };
  }
  function St(e2) {
    return {
      branding: ft,
      ...nn(hl, e2)
    };
  }
  function pe2(e2) {
    return {
      branding: A,
      sign: computeDurationSign(e2),
      ...nn(il, e2)
    };
  }
  function I2(e2) {
    return divModBigNano(e2.epochNanoseconds, Ke2)[0];
  }
  function b2(e2) {
    return bigNanoToBigInt(e2.epochNanoseconds);
  }
  function fa(e2) {
    return e2.epochNanoseconds;
  }
  function J2(e2, n2, t2, o2, r2) {
    const i2 = getMaxDurationUnit(o2), [a2, s2] = ((e3, n3) => {
      const t3 = n3((e3 = normalizeOptionsOrString(e3, Sl))[Cl]);
      let o3 = Hl(e3);
      return o3 = requirePropDefined(Sl, o3), [o3, t3];
    })(r2, e2), c2 = Math.max(a2, i2);
    if (!s2 && isUniformUnit(c2, s2)) {
      return totalDayTimeDuration(o2, a2);
    }
    if (!s2) {
      throw new RangeError(vu);
    }
    if (!o2.sign) {
      return 0;
    }
    const [u4, l2, f2] = createMarkerSystem(n2, t2, s2), d2 = createMarkerToEpochNano(f2), m3 = createMoveMarker(f2), p2 = createDiffMarkers(f2), h2 = m3(l2, u4, o2);
    isZonedEpochSlots(s2) || (Do(u4), Do(h2));
    const I3 = p2(l2, u4, h2, a2);
    return isUniformUnit(a2, s2) ? totalDayTimeDuration(I3, a2) : ya(I3, d2(h2), a2, l2, u4, d2, m3);
  }
  function ya(e2, n2, t2, o2, r2, i2, a2) {
    const s2 = computeDurationSign(e2), [c2, u4] = clampRelativeDuration(o2, dl(t2, e2), t2, s2, r2, i2, a2), l2 = ja(n2, c2, u4);
    return e2[O2[t2]] + l2 * s2;
  }
  function totalDayTimeDuration(e2, n2) {
    return La(durationFieldsToBigNano(e2), Zu[n2], 1);
  }
  function clampRelativeDuration(e2, n2, t2, o2, r2, i2, a2) {
    const s2 = O2[t2], c2 = {
      ...n2,
      [s2]: n2[s2] + o2
    }, u4 = a2(e2, r2, n2), l2 = a2(e2, r2, c2);
    return [i2(u4), i2(l2)];
  }
  function ja(e2, n2, t2) {
    const o2 = La(va(n2, t2));
    if (!o2) {
      throw new RangeError(du);
    }
    return La(va(n2, e2)) / o2;
  }
  function Le2(e2, n2) {
    const [t2, o2, r2] = refineRoundingOptions(n2, 5, 1);
    return xe(roundBigNano(e2.epochNanoseconds, t2, o2, r2, 1));
  }
  function Ie2(e2, n2, t2) {
    let { epochNanoseconds: o2, timeZone: r2, calendar: i2 } = n2;
    const [a2, s2, c2] = refineRoundingOptions(t2);
    if (0 === a2 && 1 === s2) {
      return n2;
    }
    const u4 = e2(r2);
    if (6 === a2) {
      o2 = uo(computeDayInterval, u4, n2, c2);
    } else {
      const e3 = u4.N(o2);
      o2 = getMatchingInstantFor(u4, roundDateTime(So(o2, e3), a2, s2, c2), e3, 2, 0, 1);
    }
    return Xe2(o2, r2, i2);
  }
  function bt(e2, n2) {
    return jt2(roundDateTime(e2, ...refineRoundingOptions(n2)), e2.calendar);
  }
  function lt(e2, n2) {
    const [t2, o2, r2] = refineRoundingOptions(n2, 5);
    var i2;
    return St((i2 = r2, roundTimeToNano(e2, computeNanoInc(t2, o2), i2)[0]));
  }
  function Te2(e2, n2) {
    const t2 = e2(n2.timeZone), o2 = he2(n2, t2), [r2, i2] = computeDayInterval(o2), a2 = La(va(getStartOfDayInstantFor(t2, r2), getStartOfDayInstantFor(t2, i2)), no, 1);
    if (a2 <= 0) {
      throw new RangeError(du);
    }
    return a2;
  }
  function be(e2, n2) {
    const { timeZone: t2, calendar: o2 } = n2;
    return Xe2(lo(ho, e2(t2), n2), t2, o2);
  }
  function lo(e2, n2, t2) {
    return getStartOfDayInstantFor(n2, e2(he2(t2, n2)));
  }
  function uo(e2, n2, t2, o2) {
    const r2 = he2(t2, n2), [i2, a2] = e2(r2), s2 = t2.epochNanoseconds, c2 = getStartOfDayInstantFor(n2, i2), u4 = getStartOfDayInstantFor(n2, a2);
    if (bigNanoOutside(s2, c2, u4)) {
      throw new RangeError(du);
    }
    return Ea(ja(s2, c2, u4), o2) ? u4 : c2;
  }
  function roundDateTime(e2, n2, t2, o2) {
    return roundDateTimeToNano(e2, computeNanoInc(n2, t2), o2);
  }
  function roundDateTimeToNano(e2, n2, t2) {
    const [o2, r2] = roundTimeToNano(e2, n2, t2);
    return Do({
      ...Ua(e2, r2),
      ...o2
    });
  }
  function roundTimeToNano(e2, n2, t2) {
    return nanoToIsoTimeAndDay(Da(isoTimeFieldsToNano(e2), n2, t2));
  }
  function roundToMinute(e2) {
    return Da(e2, ao, 7);
  }
  function computeNanoInc(e2, n2) {
    return Zu[e2] * n2;
  }
  function computeDayInterval(e2) {
    const n2 = ho(e2);
    return [n2, Ua(n2, 1)];
  }
  function ho(e2) {
    return Ra(6, e2);
  }
  function roundDayTimeDurationByInc(e2, n2, t2) {
    const o2 = Math.min(getMaxDurationUnit(e2), 6);
    return nanoToDurationDayTimeFields(Ya(durationFieldsToBigNano(e2, o2), n2, t2), o2);
  }
  function roundRelativeDuration(e2, n2, t2, o2, r2, i2, a2, s2, c2, u4) {
    if (0 === o2 && 1 === r2) {
      return e2;
    }
    const l2 = isUniformUnit(o2, s2) ? isZonedEpochSlots(s2) && o2 < 6 && t2 >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
    let [f2, d2, m3] = l2(e2, n2, t2, o2, r2, i2, a2, s2, c2, u4);
    return m3 && 7 !== o2 && (f2 = ((e3, n3, t3, o3, r3, i3, a3, s3) => {
      const c3 = computeDurationSign(e3);
      for (let u5 = o3 + 1; u5 <= t3; u5++) {
        if (7 === u5 && 7 !== t3) {
          continue;
        }
        const o4 = dl(u5, e3);
        o4[O2[u5]] += c3;
        const l3 = La(va(a3(s3(r3, i3, o4)), n3));
        if (l3 && Math.sign(l3) !== c3) {
          break;
        }
        e3 = o4;
      }
      return e3;
    })(f2, d2, t2, Math.max(6, o2), a2, s2, c2, u4)), f2;
  }
  function roundBigNano(e2, n2, t2, o2, r2) {
    return 6 === n2 ? [Da(Oa(e2), t2, o2), 0] : Ya(e2, computeNanoInc(n2, t2), o2, r2);
  }
  function Ya(e2, n2, t2, o2) {
    let [r2, i2] = e2;
    o2 && i2 < 0 && (i2 += go, r2 -= 1);
    const [a2, s2] = divModFloor(Da(i2, n2, t2), go);
    return createBigNano(r2 + a2, s2);
  }
  function Da(e2, n2, t2) {
    return Ea(e2 / n2, t2) * n2;
  }
  function Ea(e2, n2) {
    return ef[n2](e2);
  }
  function nudgeDayTimeDuration(e2, n2, t2, o2, r2, i2) {
    const a2 = computeDurationSign(e2), s2 = durationFieldsToBigNano(e2), c2 = roundBigNano(s2, o2, r2, i2), u4 = va(s2, c2), l2 = Math.sign(c2[0] - s2[0]) === a2, f2 = nanoToDurationDayTimeFields(c2, Math.min(t2, 6));
    return [{
      ...e2,
      ...f2
    }, so(n2, u4), l2];
  }
  function nudgeZonedTimeDuration(e2, n2, t2, o2, r2, i2, a2, s2, c2, u4) {
    const l2 = computeDurationSign(e2) || 1, f2 = La(durationFieldsToBigNano(e2, 5)), d2 = computeNanoInc(o2, r2);
    let m3 = Da(f2, d2, i2);
    const [p2, h2] = clampRelativeDuration(a2, {
      ...e2,
      ...fl
    }, 6, l2, s2, c2, u4), I3 = m3 - La(va(p2, h2));
    let D3 = 0;
    I3 && Math.sign(I3) !== l2 ? n2 = Ta(p2, m3) : (D3 += l2, m3 = Da(I3, d2, i2), n2 = Ta(h2, m3));
    const g3 = nanoToDurationTimeFields(m3);
    return [{
      ...e2,
      ...g3,
      days: e2.days + D3
    }, n2, Boolean(D3)];
  }
  function nudgeRelativeDuration(e2, n2, t2, o2, r2, i2, a2, s2, c2, u4) {
    const l2 = computeDurationSign(e2), f2 = O2[o2], d2 = dl(o2, e2);
    7 === o2 && (e2 = {
      ...e2,
      weeks: e2.weeks + Math.trunc(e2.days / 7)
    });
    const m3 = divTrunc(e2[f2], r2) * r2;
    d2[f2] = m3;
    const [p2, h2] = clampRelativeDuration(a2, d2, o2, r2 * l2, s2, c2, u4), I3 = m3 + ja(n2, p2, h2) * l2 * r2, D3 = Da(I3, r2, i2), g3 = Math.sign(D3 - I3) === l2;
    return d2[f2] = D3, [d2, g3 ? h2 : p2, g3];
  }
  function ke2(e2, n2, t2, o2) {
    const [r2, i2, a2, s2] = ((e3) => {
      const n3 = refineTimeDisplayTuple(e3 = normalizeOptions(e3));
      return [e3.timeZone, ...n3];
    })(o2), c2 = void 0 !== r2;
    return ((e3, n3, t3, o3, r3, i3) => {
      t3 = Ya(t3, r3, o3, 1);
      const a3 = n3.N(t3);
      return formatIsoDateTimeFields(So(t3, a3), i3) + (e3 ? Se2(roundToMinute(a3)) : "Z");
    })(c2, n2(c2 ? e2(r2) : nf), t2.epochNanoseconds, i2, a2, s2);
  }
  function Fe2(e2, n2, t2) {
    const [o2, r2, i2, a2, s2, c2] = ((e3) => {
      e3 = normalizeOptions(e3);
      const n3 = Jl(e3), t3 = refineSubsecDigits(e3), o3 = Ql(e3), r3 = Xl(e3, 4), i3 = xl(e3, 4);
      return [n3, Kl(e3), o3, r3, ...refineSmallestUnitAndSubsecDigits(i3, t3)];
    })(t2);
    return ((e3, n3, t3, o3, r3, i3, a3, s3, c3, u4) => {
      o3 = Ya(o3, c3, s3, 1);
      const l2 = e3(t3).N(o3);
      return formatIsoDateTimeFields(So(o3, l2), u4) + Se2(roundToMinute(l2), a3) + ((e4, n4) => 1 !== n4 ? "[" + (2 === n4 ? "!" : "") + e4 + "]" : "")(t3, i3) + formatCalendar(n3, r3);
    })(e2, n2.calendar, n2.timeZone, n2.epochNanoseconds, o2, r2, i2, a2, s2, c2);
  }
  function Ft2(e2, n2) {
    const [t2, o2, r2, i2] = ((e3) => (e3 = normalizeOptions(e3), [Jl(e3), ...refineTimeDisplayTuple(e3)]))(n2);
    return a2 = e2.calendar, s2 = t2, c2 = i2, formatIsoDateTimeFields(roundDateTimeToNano(e2, r2, o2), c2) + formatCalendar(a2, s2);
    var a2, s2, c2;
  }
  function ce2(e2, n2) {
    return t2 = e2.calendar, o2 = e2, r2 = refineDateDisplayOptions(n2), formatIsoDateFields(o2) + formatCalendar(t2, r2);
    var t2, o2, r2;
  }
  function Ht(e2, n2) {
    return formatDateLikeIso(e2.calendar, formatIsoYearMonthFields, e2, refineDateDisplayOptions(n2));
  }
  function Jt2(e2, n2) {
    return formatDateLikeIso(e2.calendar, formatIsoMonthDayFields, e2, refineDateDisplayOptions(n2));
  }
  function ct(e2, n2) {
    const [t2, o2, r2] = refineTimeDisplayOptions(n2);
    return i2 = r2, formatIsoTimeFields(roundTimeToNano(e2, o2, t2)[0], i2);
    var i2;
  }
  function k2(e2, n2) {
    const [t2, o2, r2] = refineTimeDisplayOptions(n2, 3);
    return o2 > 1 && checkDurationUnits(e2 = {
      ...e2,
      ...roundDayTimeDurationByInc(e2, o2, t2)
    }), ((e3, n3) => {
      const { sign: t3 } = e3, o3 = -1 === t3 ? negateDurationFields(e3) : e3, { hours: r3, minutes: i2 } = o3, [a2, s2] = divModBigNano(durationFieldsToBigNano(o3, 3), oo, divModTrunc);
      checkDurationTimeUnit(a2);
      const c2 = formatSubsecNano(s2, n3), u4 = n3 >= 0 || !t3 || c2;
      return (t3 < 0 ? "-" : "") + "P" + formatDurationFragments({
        Y: formatDurationNumber(o3.years),
        M: formatDurationNumber(o3.months),
        W: formatDurationNumber(o3.weeks),
        D: formatDurationNumber(o3.days)
      }) + (r3 || i2 || a2 || u4 ? "T" + formatDurationFragments({
        H: formatDurationNumber(r3),
        M: formatDurationNumber(i2),
        S: formatDurationNumber(a2, u4) + c2
      }) : "");
    })(e2, r2);
  }
  function formatDateLikeIso(e2, n2, t2, o2) {
    const r2 = o2 > 1 || 0 === o2 && e2 !== l;
    return 1 === o2 ? e2 === l ? n2(t2) : formatIsoDateFields(t2) : r2 ? formatIsoDateFields(t2) + formatCalendarId(e2, 2 === o2) : n2(t2);
  }
  function formatDurationFragments(e2) {
    const n2 = [];
    for (const t2 in e2) {
      const o2 = e2[t2];
      o2 && n2.push(o2, t2);
    }
    return n2.join("");
  }
  function formatIsoDateTimeFields(e2, n2) {
    return formatIsoDateFields(e2) + "T" + formatIsoTimeFields(e2, n2);
  }
  function formatIsoDateFields(e2) {
    return formatIsoYearMonthFields(e2) + "-" + wu(e2.isoDay);
  }
  function formatIsoYearMonthFields(e2) {
    const { isoYear: n2 } = e2;
    return (n2 < 0 || n2 > 9999 ? getSignStr(n2) + padNumber(6, Math.abs(n2)) : padNumber(4, n2)) + "-" + wu(e2.isoMonth);
  }
  function formatIsoMonthDayFields(e2) {
    return wu(e2.isoMonth) + "-" + wu(e2.isoDay);
  }
  function formatIsoTimeFields(e2, n2) {
    const t2 = [wu(e2.isoHour), wu(e2.isoMinute)];
    return -1 !== n2 && t2.push(wu(e2.isoSecond) + ((e3, n3, t3, o2) => formatSubsecNano(e3 * Ke2 + n3 * ro + t3, o2))(e2.isoMillisecond, e2.isoMicrosecond, e2.isoNanosecond, n2)), t2.join(":");
  }
  function Se2(e2, n2 = 0) {
    if (1 === n2) {
      return "";
    }
    const [t2, o2] = divModFloor(Math.abs(e2), no), [r2, i2] = divModFloor(o2, ao), [a2, s2] = divModFloor(i2, oo);
    return getSignStr(e2) + wu(t2) + ":" + wu(r2) + (a2 || s2 ? ":" + wu(a2) + formatSubsecNano(s2) : "");
  }
  function formatCalendar(e2, n2) {
    return 1 !== n2 && (n2 > 1 || 0 === n2 && e2 !== l) ? formatCalendarId(e2, 2 === n2) : "";
  }
  function formatCalendarId(e2, n2) {
    return "[" + (n2 ? "!" : "") + "u-ca=" + e2 + "]";
  }
  function formatSubsecNano(e2, n2) {
    let t2 = padNumber(9, e2);
    return t2 = void 0 === n2 ? t2.replace(af, "") : t2.slice(0, n2), t2 ? "." + t2 : "";
  }
  function getSignStr(e2) {
    return e2 < 0 ? "-" : "+";
  }
  function formatDurationNumber(e2, n2) {
    return e2 || n2 ? e2.toLocaleString("fullwide", {
      useGrouping: 0
    }) : "";
  }
  function _zonedEpochSlotsToIso(e2, n2) {
    const { epochNanoseconds: t2 } = e2, o2 = (n2.N ? n2 : n2(e2.timeZone)).N(t2), r2 = So(t2, o2);
    return {
      calendar: e2.calendar,
      ...r2,
      offsetNanoseconds: o2
    };
  }
  function getMatchingInstantFor(e2, n2, t2, o2 = 0, r2 = 0, i2, a2) {
    if (void 0 !== t2 && 1 === o2 && (1 === o2 || a2)) {
      return isoToEpochNanoWithOffset(n2, t2);
    }
    const s2 = e2.v(n2);
    if (void 0 !== t2 && 3 !== o2) {
      const e3 = ((e4, n3, t3, o3) => {
        const r3 = ma(n3);
        o3 && (t3 = roundToMinute(t3));
        for (const n4 of e4) {
          let e5 = La(va(n4, r3));
          if (o3 && (e5 = roundToMinute(e5)), e5 === t3) {
            return n4;
          }
        }
      })(s2, n2, t2, i2);
      if (void 0 !== e3) {
        return e3;
      }
      if (0 === o2) {
        throw new RangeError(gu);
      }
    }
    return a2 ? ma(n2) : $o(e2, n2, r2, s2);
  }
  function $o(e2, n2, t2 = 0, o2 = e2.v(n2)) {
    if (1 === o2.length) {
      return o2[0];
    }
    if (1 === t2) {
      throw new RangeError(Tu);
    }
    if (o2.length) {
      return o2[3 === t2 ? 1 : 0];
    }
    const r2 = ma(n2), i2 = ((e3, n3) => {
      const t3 = e3.N(Ta(n3, -go));
      return ((e4) => {
        if (e4 > go) {
          throw new RangeError(Du);
        }
        return e4;
      })(e3.N(Ta(n3, go)) - t3);
    })(e2, r2), a2 = i2 * (2 === t2 ? -1 : 1);
    return (o2 = e2.v(So(r2, a2)))[2 === t2 ? 0 : o2.length - 1];
  }
  function getStartOfDayInstantFor(e2, n2) {
    const t2 = e2.v(n2);
    if (t2.length) {
      return t2[0];
    }
    const o2 = Ta(ma(n2), -go);
    return e2.l(o2, 1);
  }
  function Ye2(e2, n2, t2) {
    return xe(io(so(n2.epochNanoseconds, ((e3) => {
      if (durationHasDateParts(e3)) {
        throw new RangeError(Pu);
      }
      return durationFieldsToBigNano(e3, 5);
    })(e2 ? negateDurationFields(t2) : t2))));
  }
  function Oe2(e2, n2, t2, o2, r2, i2 = /* @__PURE__ */ Object.create(null)) {
    const a2 = n2(o2.timeZone), s2 = e2(o2.calendar);
    return {
      ...o2,
      ...Fa(a2, s2, o2, t2 ? negateDurationFields(r2) : r2, i2)
    };
  }
  function wt(e2, n2, t2, o2, r2 = /* @__PURE__ */ Object.create(null)) {
    const { calendar: i2 } = t2;
    return jt2(ka(e2(i2), t2, n2 ? negateDurationFields(o2) : o2, r2), i2);
  }
  function ne(e2, n2, t2, o2, r2) {
    const { calendar: i2 } = t2;
    return W2(moveDate(e2(i2), t2, n2 ? negateDurationFields(o2) : o2, r2), i2);
  }
  function Gt(e2, n2, t2, o2, r2) {
    const i2 = t2.calendar, a2 = e2(i2);
    let s2 = To(Na(a2, t2));
    n2 && (o2 = B2(o2)), o2.sign < 0 && (s2 = a2.P(s2, {
      ...ll,
      months: 1
    }), s2 = Ua(s2, -1));
    const c2 = a2.P(s2, o2, r2);
    return createPlainYearMonthSlots(Na(a2, c2), i2);
  }
  function at(e2, n2, t2) {
    return St(moveTime(n2, e2 ? negateDurationFields(t2) : t2)[0]);
  }
  function Fa(e2, n2, t2, o2, r2) {
    const i2 = durationFieldsToBigNano(o2, 5);
    let a2 = t2.epochNanoseconds;
    if (durationHasDateParts(o2)) {
      const s2 = he2(t2, e2);
      a2 = so($o(e2, {
        ...moveDate(n2, s2, {
          ...o2,
          ...fl
        }, r2),
        ...nn(w2, s2)
      }), i2);
    } else {
      a2 = so(a2, i2), dt(r2);
    }
    return {
      epochNanoseconds: io(a2)
    };
  }
  function ka(e2, n2, t2, o2) {
    const [r2, i2] = moveTime(n2, t2);
    return Do({
      ...moveDate(e2, n2, {
        ...t2,
        ...fl,
        days: t2.days + i2
      }, o2),
      ...r2
    });
  }
  function moveDate(e2, n2, t2, o2) {
    if (t2.years || t2.months || t2.weeks) {
      return e2.P(n2, t2, o2);
    }
    dt(o2);
    const r2 = t2.days + durationFieldsToBigNano(t2, 5)[0];
    return r2 ? To(Ua(n2, r2)) : n2;
  }
  function Na(e2, n2, t2 = 1) {
    return Ua(n2, t2 - e2.day(n2));
  }
  function moveTime(e2, n2) {
    const [t2, o2] = durationFieldsToBigNano(n2, 5), [r2, i2] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e2) + o2);
    return [r2, t2 + i2];
  }
  function nativeDateAdd(e2, n2, t2) {
    const o2 = dt(t2);
    let r2, { years: i2, months: a2, weeks: s2, days: c2 } = n2;
    if (c2 += durationFieldsToBigNano(n2, 5)[0], i2 || a2) {
      r2 = wa(this, e2, i2, a2, o2);
    } else {
      if (!s2 && !c2) {
        return e2;
      }
      r2 = isoToEpochMilli(e2);
    }
    if (void 0 === r2) {
      throw new RangeError(Mu);
    }
    return r2 += (7 * s2 + c2) * Cu, To(Pa(r2));
  }
  function wa(e2, n2, t2, o2, r2) {
    let [i2, a2, s2] = e2.u(n2);
    if (t2) {
      const [n3, o3] = e2.m(i2, a2);
      i2 += t2, a2 = monthCodeNumberToMonth(n3, o3, e2.F(i2)), a2 = ba("month", a2, 1, e2.O(i2), r2);
    }
    return o2 && ([i2, a2] = e2.p(i2, a2, o2)), s2 = ba("day", s2, 1, e2.B(i2, a2), r2), e2.M(i2, a2, s2);
  }
  function isoMonthAdd(e2, n2, t2) {
    return e2 += divTrunc(t2, Fl), (n2 += modTrunc(t2, Fl)) < 1 ? (e2--, n2 += Fl) : n2 > Fl && (e2++, n2 -= Fl), [e2, n2];
  }
  function intlMonthAdd(e2, n2, t2) {
    if (t2) {
      if (n2 += t2, !Number.isSafeInteger(n2)) {
        throw new RangeError(Mu);
      }
      if (t2 < 0) {
        for (; n2 < 1; ) {
          n2 += computeIntlMonthsInYear.call(this, --e2);
        }
      } else {
        let t3;
        for (; n2 > (t3 = computeIntlMonthsInYear.call(this, e2)); ) {
          n2 -= t3, e2++;
        }
      }
    }
    return [e2, n2];
  }
  function Ua(e2, n2) {
    return n2 ? {
      ...e2,
      ...Pa(isoToEpochMilli(e2) + n2 * Cu)
    } : e2;
  }
  function createMarkerSystem(e2, n2, t2) {
    const o2 = e2(t2.calendar);
    return isZonedEpochSlots(t2) ? [t2, o2, n2(t2.timeZone)] : [{
      ...t2,
      ...At
    }, o2];
  }
  function createMarkerToEpochNano(e2) {
    return e2 ? fa : ma;
  }
  function createMoveMarker(e2) {
    return e2 ? gt(Fa, e2) : ka;
  }
  function createDiffMarkers(e2) {
    return e2 ? gt(diffZonedEpochsExact, e2) : diffDateTimesExact;
  }
  function isZonedEpochSlots(e2) {
    return e2 && e2.epochNanoseconds;
  }
  function isUniformUnit(e2, n2) {
    return e2 <= 6 - (isZonedEpochSlots(n2) ? 1 : 0);
  }
  function E2(e2, n2, t2, o2, r2, i2, a2) {
    const s2 = e2(normalizeOptions(a2).relativeTo), c2 = Math.max(getMaxDurationUnit(r2), getMaxDurationUnit(i2));
    if (isUniformUnit(c2, s2)) {
      return pe2(checkDurationUnits(((e3, n3, t3, o3) => {
        const r3 = so(durationFieldsToBigNano(e3), durationFieldsToBigNano(n3), o3 ? -1 : 1);
        if (!Number.isFinite(r3[0])) {
          throw new RangeError(Mu);
        }
        return {
          ...ll,
          ...nanoToDurationDayTimeFields(r3, t3)
        };
      })(r2, i2, c2, o2)));
    }
    if (!s2) {
      throw new RangeError(vu);
    }
    o2 && (i2 = negateDurationFields(i2));
    const [u4, l2, f2] = createMarkerSystem(n2, t2, s2), d2 = createMoveMarker(f2), m3 = createDiffMarkers(f2), p2 = d2(l2, u4, r2);
    return pe2(m3(l2, u4, d2(l2, p2, i2), c2));
  }
  function V2(e2, n2, t2, o2, r2) {
    const i2 = getMaxDurationUnit(o2), [a2, s2, c2, u4, l2] = ((e3, n3, t3) => {
      e3 = normalizeOptionsOrString(e3, bl);
      let o3 = $l(e3);
      const r3 = t3(e3[Cl]);
      let i3 = parseRoundingIncInteger(e3);
      const a3 = Xl(e3, 7);
      let s3 = xl(e3);
      if (void 0 === o3 && void 0 === s3) {
        throw new RangeError(Fu);
      }
      if (null == s3 && (s3 = 0), null == o3 && (o3 = Math.max(s3, n3)), checkLargestSmallestUnit(o3, s3), i3 = refineRoundingInc(i3, s3, 1), i3 > 1 && s3 > 5 && o3 !== s3) {
        throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
      }
      return [o3, s3, i3, a3, r3];
    })(r2, i2, e2), f2 = Math.max(i2, a2);
    if (!l2 && f2 <= 6) {
      return pe2(checkDurationUnits(((e3, n3, t3, o3, r3) => {
        const i3 = roundBigNano(durationFieldsToBigNano(e3), t3, o3, r3);
        return {
          ...ll,
          ...nanoToDurationDayTimeFields(i3, n3)
        };
      })(o2, a2, s2, c2, u4)));
    }
    if (!isZonedEpochSlots(l2) && !o2.sign) {
      return o2;
    }
    if (!l2) {
      throw new RangeError(vu);
    }
    const [d2, m3, p2] = createMarkerSystem(n2, t2, l2), h2 = createMarkerToEpochNano(p2), I3 = createMoveMarker(p2), D3 = createDiffMarkers(p2), g3 = I3(m3, d2, o2);
    isZonedEpochSlots(l2) || (Do(d2), Do(g3));
    let T3 = D3(m3, d2, g3, a2);
    const M3 = o2.sign, y3 = computeDurationSign(T3);
    if (M3 && y3 && M3 !== y3) {
      throw new RangeError(du);
    }
    return T3 = roundRelativeDuration(T3, h2(g3), a2, s2, c2, u4, m3, d2, h2, I3), pe2(T3);
  }
  function Y2(e2) {
    return -1 === e2.sign ? B2(e2) : e2;
  }
  function B2(e2) {
    return pe2(negateDurationFields(e2));
  }
  function negateDurationFields(e2) {
    const n2 = {};
    for (const t2 of O2) {
      n2[t2] = -1 * e2[t2] || 0;
    }
    return n2;
  }
  function y2(e2) {
    return !e2.sign;
  }
  function computeDurationSign(e2, n2 = O2) {
    let t2 = 0;
    for (const o2 of n2) {
      const n3 = Math.sign(e2[o2]);
      if (n3) {
        if (t2 && t2 !== n3) {
          throw new RangeError(Nu);
        }
        t2 = n3;
      }
    }
    return t2;
  }
  function checkDurationUnits(e2) {
    for (const n2 of cl) {
      ba(n2, e2[n2], -sf, sf, 1);
    }
    return checkDurationTimeUnit(La(durationFieldsToBigNano(e2), oo)), e2;
  }
  function checkDurationTimeUnit(e2) {
    if (!Number.isSafeInteger(e2)) {
      throw new RangeError(yu);
    }
  }
  function durationFieldsToBigNano(e2, n2 = 6) {
    return givenFieldsToBigNano(e2, n2, O2);
  }
  function nanoToDurationDayTimeFields(e2, n2 = 6) {
    const [t2, o2] = e2, r2 = nanoToGivenFields(o2, n2, O2);
    if (r2[O2[n2]] += t2 * (go / Zu[n2]), !Number.isFinite(r2[O2[n2]])) {
      throw new RangeError(Mu);
    }
    return r2;
  }
  function nanoToDurationTimeFields(e2, n2 = 5) {
    return nanoToGivenFields(e2, n2, O2);
  }
  function durationHasDateParts(e2) {
    return Boolean(computeDurationSign(e2, sl));
  }
  function getMaxDurationUnit(e2) {
    let n2 = 9;
    for (; n2 > 0 && !e2[O2[n2]]; n2--) {
    }
    return n2;
  }
  function createSplitTuple(e2, n2) {
    return [e2, n2];
  }
  function computePeriod(e2) {
    const n2 = Math.floor(e2 / tf) * tf;
    return [n2, n2 + tf];
  }
  function We2(e2) {
    const n2 = parseDateTimeLike(e2 = toStringViaPrimitive(e2));
    if (!n2) {
      throw new RangeError(failedParse(e2));
    }
    let t2;
    if (n2.C) {
      t2 = 0;
    } else {
      if (!n2.offset) {
        throw new RangeError(failedParse(e2));
      }
      t2 = parseOffsetNano(n2.offset);
    }
    return n2.timeZone && parseOffsetNanoMaybe(n2.timeZone, 1), xe(isoToEpochNanoWithOffset(checkIsoDateTimeFields(n2), t2));
  }
  function $2(e2) {
    const n2 = parseDateTimeLike(d(e2));
    if (!n2) {
      throw new RangeError(failedParse(e2));
    }
    if (n2.timeZone) {
      return finalizeZonedDateTime(n2, n2.offset ? parseOffsetNano(n2.offset) : void 0);
    }
    if (n2.C) {
      throw new RangeError(failedParse(e2));
    }
    return finalizeDate(n2);
  }
  function Ne2(e2, n2) {
    const t2 = parseDateTimeLike(d(e2));
    if (!t2 || !t2.timeZone) {
      throw new RangeError(failedParse(e2));
    }
    const { offset: o2 } = t2, r2 = o2 ? parseOffsetNano(o2) : void 0, [, i2, a2] = je2(n2);
    return finalizeZonedDateTime(t2, r2, i2, a2);
  }
  function parseOffsetNano(e2) {
    const n2 = parseOffsetNanoMaybe(e2);
    if (void 0 === n2) {
      throw new RangeError(failedParse(e2));
    }
    return n2;
  }
  function Bt(e2) {
    const n2 = parseDateTimeLike(d(e2));
    if (!n2 || n2.C) {
      throw new RangeError(failedParse(e2));
    }
    return jt2(finalizeDateTime(n2));
  }
  function me2(e2, n2, t2) {
    let o2 = parseDateTimeLike(d(e2));
    if (!o2 || o2.C) {
      throw new RangeError(failedParse(e2));
    }
    return n2 ? o2.calendar === l && (o2 = -271821 === o2.isoYear && 4 === o2.isoMonth ? {
      ...o2,
      isoDay: 20,
      ...At
    } : {
      ...o2,
      isoDay: 1,
      ...At
    }) : t2 && o2.calendar === l && (o2 = {
      ...o2,
      isoYear: Pl
    }), W2(o2.k ? finalizeDateTime(o2) : finalizeDate(o2));
  }
  function Xt(e2, n2) {
    const t2 = parseYearMonthOnly(d(n2));
    if (t2) {
      return requireIsoCalendar(t2), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(t2)));
    }
    const o2 = me2(n2, 1);
    return createPlainYearMonthSlots(Na(e2(o2.calendar), o2));
  }
  function requireIsoCalendar(e2) {
    if (e2.calendar !== l) {
      throw new RangeError(invalidSubstring(e2.calendar));
    }
  }
  function xt(e2, n2) {
    const t2 = parseMonthDayOnly(d(n2));
    if (t2) {
      return requireIsoCalendar(t2), createPlainMonthDaySlots(checkIsoDateFields(t2));
    }
    const o2 = me2(n2, 0, 1), { calendar: r2 } = o2, i2 = e2(r2), [a2, s2, c2] = i2.u(o2), [u4, l2] = i2.m(a2, s2), [f2, m3] = i2.R(u4, l2, c2);
    return createPlainMonthDaySlots(To(i2.U(f2, m3, c2)), r2);
  }
  function ht(e2) {
    let n2, t2 = ((e3) => {
      const n3 = Tf.exec(e3);
      return n3 ? (organizeAnnotationParts(n3[10]), organizeTimeParts(n3)) : void 0;
    })(d(e2));
    if (!t2) {
      if (t2 = parseDateTimeLike(e2), !t2) {
        throw new RangeError(failedParse(e2));
      }
      if (!t2.k) {
        throw new RangeError(failedParse(e2));
      }
      if (t2.C) {
        throw new RangeError(invalidSubstring("Z"));
      }
      requireIsoCalendar(t2);
    }
    if ((n2 = parseYearMonthOnly(e2)) && isIsoDateFieldsValid(n2)) {
      throw new RangeError(failedParse(e2));
    }
    if ((n2 = parseMonthDayOnly(e2)) && isIsoDateFieldsValid(n2)) {
      throw new RangeError(failedParse(e2));
    }
    return St(constrainIsoTimeFields(t2, 1));
  }
  function R(e2) {
    const n2 = ((e3) => {
      const n3 = Nf.exec(e3);
      return n3 ? ((e4) => {
        function parseUnit(e5, r3, i2) {
          let a2 = 0, s2 = 0;
          if (i2 && ([a2, o2] = divModFloor(o2, Zu[i2])), void 0 !== e5) {
            if (t2) {
              throw new RangeError(invalidSubstring(e5));
            }
            s2 = ((e6) => {
              const n5 = parseInt(e6);
              if (!Number.isFinite(n5)) {
                throw new RangeError(invalidSubstring(e6));
              }
              return n5;
            })(e5), n4 = 1, r3 && (o2 = parseSubsecNano(r3) * (Zu[i2] / oo), t2 = 1);
          }
          return a2 + s2;
        }
        let n4 = 0, t2 = 0, o2 = 0, r2 = {
          ...zipProps(O2, [parseUnit(e4[2]), parseUnit(e4[3]), parseUnit(e4[4]), parseUnit(e4[5]), parseUnit(e4[6], e4[7], 5), parseUnit(e4[8], e4[9], 4), parseUnit(e4[10], e4[11], 3)]),
          ...nanoToGivenFields(o2, 2, O2)
        };
        if (!n4) {
          throw new RangeError(noValidFields(O2));
        }
        return parseSign(e4[1]) < 0 && (r2 = negateDurationFields(r2)), r2;
      })(n3) : void 0;
    })(d(e2));
    if (!n2) {
      throw new RangeError(failedParse(e2));
    }
    return pe2(checkDurationUnits(n2));
  }
  function f(e2) {
    const n2 = parseDateTimeLike(e2) || parseYearMonthOnly(e2) || parseMonthDayOnly(e2);
    return n2 ? n2.calendar : e2;
  }
  function M2(e2) {
    const n2 = parseDateTimeLike(e2);
    return n2 && (n2.timeZone || n2.C && nf || n2.offset) || e2;
  }
  function finalizeZonedDateTime(e2, n2, t2 = 0, o2 = 0) {
    const r2 = Z(e2.timeZone), i2 = L2(r2);
    let a2;
    return checkIsoDateTimeFields(e2), a2 = e2.k ? getMatchingInstantFor(i2, e2, n2, t2, o2, !i2.j, e2.C) : getStartOfDayInstantFor(i2, e2), Xe2(a2, r2, u3(e2.calendar));
  }
  function finalizeDateTime(e2) {
    return resolveSlotsCalendar(Do(checkIsoDateTimeFields(e2)));
  }
  function finalizeDate(e2) {
    return resolveSlotsCalendar(To(checkIsoDateFields(e2)));
  }
  function resolveSlotsCalendar(e2) {
    return {
      ...e2,
      calendar: u3(e2.calendar)
    };
  }
  function parseDateTimeLike(e2) {
    const n2 = gf.exec(e2);
    return n2 ? ((e3) => {
      const n3 = e3[10], t2 = "Z" === (n3 || "").toUpperCase();
      return {
        isoYear: organizeIsoYearParts(e3),
        isoMonth: parseInt(e3[4]),
        isoDay: parseInt(e3[5]),
        ...organizeTimeParts(e3.slice(5)),
        ...organizeAnnotationParts(e3[16]),
        k: Boolean(e3[6]),
        C: t2,
        offset: t2 ? void 0 : n3
      };
    })(n2) : void 0;
  }
  function parseYearMonthOnly(e2) {
    const n2 = If.exec(e2);
    return n2 ? ((e3) => ({
      isoYear: organizeIsoYearParts(e3),
      isoMonth: parseInt(e3[4]),
      isoDay: 1,
      ...organizeAnnotationParts(e3[5])
    }))(n2) : void 0;
  }
  function parseMonthDayOnly(e2) {
    const n2 = Df.exec(e2);
    return n2 ? ((e3) => ({
      isoYear: Pl,
      isoMonth: parseInt(e3[1]),
      isoDay: parseInt(e3[2]),
      ...organizeAnnotationParts(e3[3])
    }))(n2) : void 0;
  }
  function parseOffsetNanoMaybe(e2, n2) {
    const t2 = Mf.exec(e2);
    return t2 ? ((e3, n3) => {
      const t3 = e3[4] || e3[5];
      if (n3 && t3) {
        throw new RangeError(invalidSubstring(t3));
      }
      return ((e4) => {
        if (Math.abs(e4) >= go) {
          throw new RangeError(Iu);
        }
        return e4;
      })((parseInt0(e3[2]) * no + parseInt0(e3[3]) * ao + parseInt0(e3[4]) * oo + parseSubsecNano(e3[5] || "")) * parseSign(e3[1]));
    })(t2, n2) : void 0;
  }
  function organizeIsoYearParts(e2) {
    const n2 = parseSign(e2[1]), t2 = parseInt(e2[2] || e2[3]);
    if (n2 < 0 && !t2) {
      throw new RangeError(invalidSubstring(-0));
    }
    return n2 * t2;
  }
  function organizeTimeParts(e2) {
    const n2 = parseInt0(e2[3]);
    return {
      ...nanoToIsoTimeAndDay(parseSubsecNano(e2[4] || ""))[0],
      isoHour: parseInt0(e2[1]),
      isoMinute: parseInt0(e2[2]),
      isoSecond: 60 === n2 ? 59 : n2
    };
  }
  function organizeAnnotationParts(e2) {
    let n2, t2;
    const o2 = [];
    if (e2.replace(yf, ((e3, r2, i2) => {
      const a2 = Boolean(r2), [s2, c2] = i2.split("=").reverse();
      if (c2) {
        if ("u-ca" === c2) {
          o2.push(s2), n2 || (n2 = a2);
        } else if (a2 || /[A-Z]/.test(c2)) {
          throw new RangeError(invalidSubstring(e3));
        }
      } else {
        if (t2) {
          throw new RangeError(invalidSubstring(e3));
        }
        t2 = s2;
      }
      return "";
    })), o2.length > 1 && n2) {
      throw new RangeError(invalidSubstring(e2));
    }
    return {
      timeZone: t2,
      calendar: o2[0] || l
    };
  }
  function parseSubsecNano(e2) {
    return parseInt(e2.padEnd(9, "0"));
  }
  function createRegExp(e2) {
    return new RegExp(`^${e2}$`, "i");
  }
  function parseSign(e2) {
    return e2 && "+" !== e2 ? -1 : 1;
  }
  function parseInt0(e2) {
    return void 0 === e2 ? 0 : parseInt(e2);
  }
  function Me2(e2) {
    return Z(d(e2));
  }
  function Z(e2) {
    const n2 = getTimeZoneEssence(e2);
    return "number" == typeof n2 ? Se2(n2) : n2 ? ((e3) => {
      if (Ff.test(e3)) {
        throw new RangeError(F2(e3));
      }
      if (Pf.test(e3)) {
        throw new RangeError(hu);
      }
      return e3.toLowerCase().split("/").map(((e4, n3) => (e4.length <= 3 || /\d/.test(e4)) && !/etc|yap/.test(e4) ? e4.toUpperCase() : e4.replace(/baja|dumont|[a-z]+/g, ((e5, t2) => e5.length <= 2 && !n3 || "in" === e5 || "chat" === e5 ? e5.toUpperCase() : e5.length > 2 || !t2 ? capitalize(e5).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e5)))).join("/");
    })(e2) : nf;
  }
  function getTimeZoneAtomic(e2) {
    const n2 = getTimeZoneEssence(e2);
    return "number" == typeof n2 ? n2 : n2 ? n2.resolvedOptions().timeZone : nf;
  }
  function getTimeZoneEssence(e2) {
    const n2 = parseOffsetNanoMaybe(e2 = e2.toUpperCase(), 1);
    return void 0 !== n2 ? n2 : e2 !== nf ? vf(e2) : void 0;
  }
  function He2(e2, n2) {
    return pa(e2.epochNanoseconds, n2.epochNanoseconds);
  }
  function Be2(e2, n2) {
    return pa(e2.epochNanoseconds, n2.epochNanoseconds);
  }
  function H2(e2, n2, t2, o2, r2, i2) {
    const a2 = e2(normalizeOptions(i2).relativeTo), s2 = Math.max(getMaxDurationUnit(o2), getMaxDurationUnit(r2));
    if (allPropsEqual(O2, o2, r2)) {
      return 0;
    }
    if (isUniformUnit(s2, a2)) {
      return pa(durationFieldsToBigNano(o2), durationFieldsToBigNano(r2));
    }
    if (!a2) {
      throw new RangeError(vu);
    }
    const [c2, u4, l2] = createMarkerSystem(n2, t2, a2), f2 = createMarkerToEpochNano(l2), d2 = createMoveMarker(l2);
    return pa(f2(d2(u4, c2, o2)), f2(d2(u4, c2, r2)));
  }
  function Yt(e2, n2) {
    return te(e2, n2) || Dt(e2, n2);
  }
  function te(e2, n2) {
    return compareNumbers(isoToEpochMilli(e2), isoToEpochMilli(n2));
  }
  function Dt(e2, n2) {
    return compareNumbers(isoTimeFieldsToNano(e2), isoTimeFieldsToNano(n2));
  }
  function Ve2(e2, n2) {
    return !He2(e2, n2);
  }
  function ve2(e2, n2) {
    return !Be2(e2, n2) && !!isTimeZoneIdsEqual(e2.timeZone, n2.timeZone) && e2.calendar === n2.calendar;
  }
  function vt(e2, n2) {
    return !Yt(e2, n2) && e2.calendar === n2.calendar;
  }
  function re2(e2, n2) {
    return !te(e2, n2) && e2.calendar === n2.calendar;
  }
  function zt(e2, n2) {
    return !te(e2, n2) && e2.calendar === n2.calendar;
  }
  function Lt(e2, n2) {
    return !te(e2, n2) && e2.calendar === n2.calendar;
  }
  function st(e2, n2) {
    return !Dt(e2, n2);
  }
  function isTimeZoneIdsEqual(e2, n2) {
    if (e2 === n2) {
      return 1;
    }
    try {
      return getTimeZoneAtomic(e2) === getTimeZoneAtomic(n2);
    } catch (e3) {
    }
  }
  function Ee2(e2, n2, t2, o2) {
    const r2 = refineDiffOptions(e2, o2, 3, 5), i2 = diffEpochNanos(n2.epochNanoseconds, t2.epochNanoseconds, ...r2);
    return pe2(e2 ? negateDurationFields(i2) : i2);
  }
  function we2(e2, n2, t2, o2, r2, i2) {
    const a2 = ha(o2.calendar, r2.calendar), [s2, c2, u4, l2] = refineDiffOptions(t2, i2, 5), f2 = o2.epochNanoseconds, d2 = r2.epochNanoseconds, m3 = pa(d2, f2);
    let p2;
    if (m3) {
      if (s2 < 6) {
        p2 = diffEpochNanos(f2, d2, s2, c2, u4, l2);
      } else {
        const t3 = n2(ga(o2.timeZone, r2.timeZone)), f3 = e2(a2);
        p2 = diffZonedEpochsBig(f3, t3, o2, r2, m3, s2, i2), p2 = roundRelativeDuration(p2, d2, s2, c2, u4, l2, f3, o2, fa, gt(Fa, t3));
      }
    } else {
      p2 = ll;
    }
    return pe2(t2 ? negateDurationFields(p2) : p2);
  }
  function It(e2, n2, t2, o2, r2) {
    const i2 = ha(t2.calendar, o2.calendar), [a2, s2, c2, u4] = refineDiffOptions(n2, r2, 6), l2 = ma(t2), f2 = ma(o2), d2 = pa(f2, l2);
    let m3;
    if (d2) {
      if (a2 <= 6) {
        m3 = diffEpochNanos(l2, f2, a2, s2, c2, u4);
      } else {
        const n3 = e2(i2);
        m3 = diffDateTimesBig(n3, t2, o2, d2, a2, r2), m3 = roundRelativeDuration(m3, f2, a2, s2, c2, u4, n3, t2, ma, ka);
      }
    } else {
      m3 = ll;
    }
    return pe2(n2 ? negateDurationFields(m3) : m3);
  }
  function oe2(e2, n2, t2, o2, r2) {
    const i2 = ha(t2.calendar, o2.calendar);
    return diffDateLike(n2, (() => e2(i2)), t2, o2, ...refineDiffOptions(n2, r2, 6, 9, 6));
  }
  function _t(e2, n2, t2, o2, r2) {
    const i2 = ha(t2.calendar, o2.calendar), a2 = refineDiffOptions(n2, r2, 9, 9, 8), s2 = e2(i2), c2 = Na(s2, t2), u4 = Na(s2, o2);
    return c2.isoYear === u4.isoYear && c2.isoMonth === u4.isoMonth && c2.isoDay === u4.isoDay ? pe2(ll) : diffDateLike(n2, (() => s2), To(c2), To(u4), ...a2, 8);
  }
  function diffDateLike(e2, n2, t2, o2, r2, i2, a2, s2, c2 = 6) {
    const u4 = ma(t2), l2 = ma(o2);
    if (void 0 === u4 || void 0 === l2) {
      throw new RangeError(Mu);
    }
    let f2;
    if (pa(l2, u4)) {
      if (6 === r2) {
        f2 = diffEpochNanos(u4, l2, r2, i2, a2, s2);
      } else {
        const e3 = n2();
        f2 = e3.h(t2, o2, r2), i2 === c2 && 1 === a2 || (f2 = roundRelativeDuration(f2, l2, r2, i2, a2, s2, e3, t2, ma, moveDate));
      }
    } else {
      f2 = ll;
    }
    return pe2(e2 ? negateDurationFields(f2) : f2);
  }
  function it(e2, n2, t2, o2) {
    const [r2, i2, a2, s2] = refineDiffOptions(e2, o2, 5, 5), c2 = Da(diffTimes(n2, t2), computeNanoInc(i2, a2), s2), u4 = {
      ...ll,
      ...nanoToDurationTimeFields(c2, r2)
    };
    return pe2(e2 ? negateDurationFields(u4) : u4);
  }
  function diffZonedEpochsExact(e2, n2, t2, o2, r2, i2) {
    const a2 = pa(o2.epochNanoseconds, t2.epochNanoseconds);
    return a2 ? r2 < 6 ? diffEpochNanosExact(t2.epochNanoseconds, o2.epochNanoseconds, r2) : diffZonedEpochsBig(n2, e2, t2, o2, a2, r2, i2) : ll;
  }
  function diffDateTimesExact(e2, n2, t2, o2, r2) {
    const i2 = ma(n2), a2 = ma(t2), s2 = pa(a2, i2);
    return s2 ? o2 <= 6 ? diffEpochNanosExact(i2, a2, o2) : diffDateTimesBig(e2, n2, t2, s2, o2, r2) : ll;
  }
  function diffZonedEpochsBig(e2, n2, t2, o2, r2, i2, a2) {
    const [s2, c2, u4] = Sa(n2, t2, o2, r2);
    var l2, f2;
    return {
      ...6 === i2 ? (l2 = s2, f2 = c2, {
        ...ll,
        days: td(l2, f2)
      }) : e2.h(s2, c2, i2, a2),
      ...nanoToDurationTimeFields(u4)
    };
  }
  function diffDateTimesBig(e2, n2, t2, o2, r2, i2) {
    const [a2, s2, c2] = ((e3, n3, t3) => {
      let o3 = n3, r3 = diffTimes(e3, n3);
      return Math.sign(r3) === -t3 && (o3 = Ua(n3, -t3), r3 += go * t3), [e3, o3, r3];
    })(n2, t2, o2);
    return {
      ...e2.h(a2, s2, r2, i2),
      ...nanoToDurationTimeFields(c2)
    };
  }
  function Sa(e2, n2, t2, o2) {
    function updateMid() {
      return l2 = {
        ...Ua(a2, c2++ * -o2),
        ...i2
      }, f2 = $o(e2, l2), pa(s2, f2) === -o2;
    }
    const r2 = he2(n2, e2), i2 = nn(w2, r2), a2 = he2(t2, e2), s2 = t2.epochNanoseconds;
    let c2 = 0;
    const u4 = diffTimes(r2, a2);
    let l2, f2;
    if (Math.sign(u4) === -o2 && c2++, updateMid() && (-1 === o2 || updateMid())) {
      throw new RangeError(du);
    }
    const d2 = La(va(f2, s2));
    return [r2, l2, d2];
  }
  function diffEpochNanos(e2, n2, t2, o2, r2, i2) {
    return {
      ...ll,
      ...nanoToDurationDayTimeFields(roundBigNano(va(e2, n2), o2, r2, i2), t2)
    };
  }
  function diffEpochNanosExact(e2, n2, t2) {
    return {
      ...ll,
      ...nanoToDurationDayTimeFields(va(e2, n2), t2)
    };
  }
  function td(e2, n2) {
    return diffEpochMilliByDay(isoToEpochMilli(e2), isoToEpochMilli(n2));
  }
  function diffEpochMilliByDay(e2, n2) {
    return Math.trunc((n2 - e2) / Cu);
  }
  function diffTimes(e2, n2) {
    return isoTimeFieldsToNano(n2) - isoTimeFieldsToNano(e2);
  }
  function nativeDateUntil(e2, n2, t2) {
    if (t2 <= 7) {
      let o3 = 0, r3 = td({
        ...e2,
        ...At
      }, {
        ...n2,
        ...At
      });
      return 7 === t2 && ([o3, r3] = divModTrunc(r3, 7)), {
        ...ll,
        weeks: o3,
        days: r3
      };
    }
    const o2 = this.u(e2), r2 = this.u(n2);
    let [i2, a2, s2] = ((e3, n3, t3, o3, r3, i3, a3) => {
      let s3 = r3 - n3, c2 = i3 - t3, u4 = a3 - o3;
      if (s3 || c2) {
        const l2 = Math.sign(s3 || c2);
        let f2 = e3.B(r3, i3), d2 = 0;
        if (Math.sign(u4) === -l2) {
          const o4 = f2;
          [r3, i3] = e3.p(r3, i3, -l2), s3 = r3 - n3, c2 = i3 - t3, f2 = e3.B(r3, i3), d2 = l2 < 0 ? -o4 : f2;
        }
        if (u4 = a3 - Math.min(o3, f2) + d2, s3) {
          const [o4, a4] = e3.m(n3, t3), [u5, f3] = e3.m(r3, i3);
          if (c2 = u5 - o4 || Number(f3) - Number(a4), Math.sign(c2) === -l2) {
            const t4 = l2 < 0 && -e3.O(r3);
            s3 = (r3 -= l2) - n3, c2 = i3 - monthCodeNumberToMonth(o4, a4, e3.F(r3)) + (t4 || e3.O(r3));
          }
        }
      }
      return [s3, c2, u4];
    })(this, ...o2, ...r2);
    return 8 === t2 && (a2 += this.q(i2, o2[0]), i2 = 0), {
      ...ll,
      years: i2,
      months: a2,
      days: s2
    };
  }
  function computeIsoMonthsInYearSpan(e2) {
    return e2 * Fl;
  }
  function computeIntlMonthsInYearSpan(e2, n2) {
    const t2 = n2 + e2, o2 = Math.sign(e2), r2 = o2 < 0 ? -1 : 0;
    let i2 = 0;
    for (let e3 = n2; e3 !== t2; e3 += o2) {
      i2 += computeIntlMonthsInYear.call(this, e3 + r2);
    }
    return i2;
  }
  function ha(e2, n2) {
    if (e2 !== n2) {
      throw new RangeError(mu);
    }
    return e2;
  }
  function ga(e2, n2) {
    if (!isTimeZoneIdsEqual(e2, n2)) {
      throw new RangeError(pu);
    }
    return e2;
  }
  function computeNativeWeekOfYear(e2) {
    return this.I(e2)[0];
  }
  function computeNativeYearOfWeek(e2) {
    return this.I(e2)[1];
  }
  function computeNativeInLeapYear(e2) {
    const [n2] = this.u(e2);
    return this.L(n2);
  }
  function computeNativeMonthsInYear(e2) {
    const [n2] = this.u(e2);
    return this.O(n2);
  }
  function computeNativeDaysInMonth(e2) {
    const [n2, t2] = this.u(e2);
    return this.B(n2, t2);
  }
  function computeNativeDaysInYear(e2) {
    const [n2] = this.u(e2);
    return this.G(n2);
  }
  function computeNativeDayOfYear(e2) {
    const [n2] = this.u(e2);
    return diffEpochMilliByDay(this.M(n2), isoToEpochMilli(e2)) + 1;
  }
  function parseMonthCode(e2) {
    const n2 = Ef.exec(e2);
    if (!n2) {
      throw new RangeError(invalidMonthCode(e2));
    }
    return [parseInt(n2[1]), Boolean(n2[2])];
  }
  function sa(e2, n2) {
    return "M" + wu(e2) + (n2 ? "L" : "");
  }
  function monthCodeNumberToMonth(e2, n2, t2) {
    return e2 + (n2 || t2 && e2 >= t2 ? 1 : 0);
  }
  function monthToMonthCodeNumber(e2, n2) {
    return e2 - (n2 && e2 >= n2 ? 1 : 0);
  }
  function eraYearToYear(e2, n2) {
    return (n2 + e2) * (Math.sign(n2) || 1) || 0;
  }
  function getCalendarEraOrigins(e2) {
    return nl[getCalendarIdBase(e2)];
  }
  function getCalendarLeapMonthMeta(e2) {
    return ol[getCalendarIdBase(e2)];
  }
  function getCalendarIdBase(e2) {
    return computeCalendarIdBase(e2.id || l);
  }
  function createIntlCalendar(e2) {
    function epochMilliToIntlFields(e3) {
      return ((e4, n3) => ({
        ...parseIntlYear(e4, n3),
        V: e4.month,
        day: parseInt(e4.day)
      }))(hashIntlFormatParts(n2, e3), t2);
    }
    const n2 = bf(e2), t2 = computeCalendarIdBase(e2);
    return {
      id: e2,
      _: createIntlFieldCache(epochMilliToIntlFields),
      J: createIntlYearDataCache(epochMilliToIntlFields)
    };
  }
  function createIntlFieldCache(e2) {
    return on(((n2) => {
      const t2 = isoToEpochMilli(n2);
      return e2(t2);
    }), WeakMap);
  }
  function createIntlYearDataCache(e2) {
    const n2 = e2(0).year - vl;
    return on(((t2) => {
      let o2, r2 = isoArgsToEpochMilli(t2 - n2), i2 = 0;
      const a2 = [], s2 = [];
      do {
        r2 += 400 * Cu;
      } while ((o2 = e2(r2)).year <= t2);
      do {
        if (r2 += (1 - o2.day) * Cu, o2.year === t2 && (a2.push(r2), s2.push(o2.V)), r2 -= Cu, ++i2 > 100 || r2 < -gl) {
          throw new RangeError(du);
        }
      } while ((o2 = e2(r2)).year >= t2);
      return {
        K: a2.reverse(),
        X: bu(s2.reverse())
      };
    }));
  }
  function parseIntlYear(e2, n2) {
    let t2, o2, r2 = parseIntlPartsYear(e2);
    if (e2.era) {
      const i2 = nl[n2], a2 = tl[n2] || {};
      void 0 !== i2 && (t2 = "islamic" === n2 ? "ah" : e2.era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), "bc" === t2 || "b" === t2 ? t2 = "bce" : "ad" === t2 || "a" === t2 ? t2 = "ce" : "beforeroc" === t2 && (t2 = "broc"), t2 = a2[t2] || t2, o2 = r2, r2 = eraYearToYear(o2, i2[t2] || 0));
    }
    return {
      era: t2,
      eraYear: o2,
      year: r2
    };
  }
  function parseIntlPartsYear(e2) {
    return parseInt(e2.relatedYear || e2.year);
  }
  function computeIntlDay(e2) {
    return this._(e2).day;
  }
  function computeIntlDateParts(e2) {
    const { year: n2, V: t2, day: o2 } = this._(e2), { X: r2 } = this.J(n2);
    return [n2, r2[t2] + 1, o2];
  }
  function computeIsoFieldsFromIntlParts(e2, n2, t2) {
    return Pa(computeIntlEpochMilli.call(this, e2, n2, t2));
  }
  function computeIntlEpochMilli(e2, n2 = 1, t2 = 1) {
    return this.J(e2).K[n2 - 1] + (t2 - 1) * Cu;
  }
  function computeIntlMonthCodeParts(e2, n2) {
    const t2 = computeIntlLeapMonth.call(this, e2);
    return [monthToMonthCodeNumber(n2, t2), t2 === n2];
  }
  function computeIntlLeapMonth(e2) {
    const n2 = queryMonthStrings(this, e2), t2 = queryMonthStrings(this, e2 - 1), o2 = n2.length;
    if (o2 > t2.length) {
      const e3 = getCalendarLeapMonthMeta(this);
      if (e3 < 0) {
        return -e3;
      }
      for (let e4 = 0; e4 < o2; e4++) {
        if (n2[e4] !== t2[e4]) {
          return e4 + 1;
        }
      }
    }
  }
  function computeIntlInLeapYear(e2) {
    const n2 = computeIntlDaysInYear.call(this, e2);
    return n2 > computeIntlDaysInYear.call(this, e2 - 1) && n2 > computeIntlDaysInYear.call(this, e2 + 1);
  }
  function computeIntlDaysInYear(e2) {
    return diffEpochMilliByDay(computeIntlEpochMilli.call(this, e2), computeIntlEpochMilli.call(this, e2 + 1));
  }
  function computeIntlDaysInMonth(e2, n2) {
    const { K: t2 } = this.J(e2);
    let o2 = n2 + 1, r2 = t2;
    return o2 > t2.length && (o2 = 1, r2 = this.J(e2 + 1).K), diffEpochMilliByDay(t2[n2 - 1], r2[o2 - 1]);
  }
  function computeIntlMonthsInYear(e2) {
    return this.J(e2).K.length;
  }
  function computeIntlEraParts(e2) {
    const n2 = this._(e2);
    return [n2.era, n2.eraYear];
  }
  function computeIntlYearMonthForMonthDay(e2, n2, t2) {
    const o2 = this.id && "chinese" === computeCalendarIdBase(this.id) ? ((e3, n3, t3) => {
      if (n3) {
        switch (e3) {
          case 1:
            return 1651;
          case 2:
            return t3 < 30 ? 1947 : 1765;
          case 3:
            return t3 < 30 ? 1966 : 1955;
          case 4:
            return t3 < 30 ? 1963 : 1944;
          case 5:
            return t3 < 30 ? 1971 : 1952;
          case 6:
            return t3 < 30 ? 1960 : 1941;
          case 7:
            return t3 < 30 ? 1968 : 1938;
          case 8:
            return t3 < 30 ? 1957 : 1718;
          case 9:
            return 1832;
          case 10:
            return 1870;
          case 11:
            return 1814;
          case 12:
            return 1890;
        }
      }
      return 1972;
    })(e2, n2, t2) : Pl;
    let [r2, i2, a2] = computeIntlDateParts.call(this, {
      isoYear: o2,
      isoMonth: Fl,
      isoDay: 31
    });
    const s2 = computeIntlLeapMonth.call(this, r2), c2 = i2 === s2;
    1 === (compareNumbers(e2, monthToMonthCodeNumber(i2, s2)) || compareNumbers(Number(n2), Number(c2)) || compareNumbers(t2, a2)) && r2--;
    for (let o3 = 0; o3 < 100; o3++) {
      const i3 = r2 - o3, a3 = computeIntlLeapMonth.call(this, i3), s3 = monthCodeNumberToMonth(e2, n2, a3);
      if (n2 === (s3 === a3) && t2 <= computeIntlDaysInMonth.call(this, i3, s3)) {
        return [i3, s3];
      }
    }
  }
  function queryMonthStrings(e2, n2) {
    return Object.keys(e2.J(n2).X);
  }
  function Zt(e2) {
    return u3(d(e2));
  }
  function u3(e2) {
    if ((e2 = e2.toLowerCase()) !== l && e2 !== Xu) {
      const n2 = bf(e2).resolvedOptions().calendar;
      if (computeCalendarIdBase(e2) !== computeCalendarIdBase(n2)) {
        throw new RangeError(c(e2));
      }
      return n2;
    }
    return e2;
  }
  function computeCalendarIdBase(e2) {
    return "islamicc" === e2 && (e2 = "islamic"), e2.split("-")[0];
  }
  function createNativeOpsCreator(e2, n2) {
    return (t2) => t2 === l ? e2 : t2 === Xu || t2 === el ? Object.assign(Object.create(e2), {
      id: t2
    }) : Object.assign(Object.create(n2), Of(t2));
  }
  function z2(e2, n2, t2, o2) {
    const r2 = refineCalendarFields(t2, o2, _u, [], ju);
    if (void 0 !== r2.timeZone) {
      const o3 = t2.ee(r2), i2 = refineTimeBag(r2), a2 = e2(r2.timeZone);
      return {
        epochNanoseconds: getMatchingInstantFor(n2(a2), {
          ...o3,
          ...i2
        }, void 0 !== r2.offset ? parseOffsetNano(r2.offset) : void 0),
        timeZone: a2
      };
    }
    return {
      ...t2.ee(r2),
      ...At
    };
  }
  function Ae2(e2, n2, t2, o2, r2, i2) {
    const a2 = refineCalendarFields(t2, r2, _u, Au, ju), s2 = e2(a2.timeZone), [c2, u4, l2] = je2(i2), f2 = t2.ee(a2, fabricateOverflowOptions(c2)), d2 = refineTimeBag(a2, c2);
    return Xe2(getMatchingInstantFor(n2(s2), {
      ...f2,
      ...d2
    }, void 0 !== a2.offset ? parseOffsetNano(a2.offset) : void 0, u4, l2), s2, o2);
  }
  function Nt(e2, n2, t2) {
    const o2 = refineCalendarFields(e2, n2, _u, [], p), r2 = dt(t2);
    return jt2(Do({
      ...e2.ee(o2, fabricateOverflowOptions(r2)),
      ...refineTimeBag(o2, r2)
    }));
  }
  function de2(e2, n2, t2, o2 = []) {
    const r2 = refineCalendarFields(e2, n2, _u, o2);
    return e2.ee(r2, t2);
  }
  function Ut2(e2, n2, t2, o2) {
    const r2 = refineCalendarFields(e2, n2, Gu, o2);
    return e2.ne(r2, t2);
  }
  function Rt(e2, n2, t2, o2) {
    const r2 = refineCalendarFields(e2, t2, _u, Hu);
    return n2 && void 0 !== r2.month && void 0 === r2.monthCode && void 0 === r2.year && (r2.year = Pl), e2.te(r2, o2);
  }
  function Tt(e2, n2) {
    return St(refineTimeBag(refineFields(e2, Ru, [], 1), dt(n2)));
  }
  function q2(e2) {
    const n2 = refineFields(e2, il);
    return pe2(checkDurationUnits({
      ...ll,
      ...n2
    }));
  }
  function refineCalendarFields(e2, n2, t2, o2 = [], r2 = []) {
    return refineFields(n2, [...e2.fields(t2), ...r2].sort(), o2);
  }
  function refineFields(e2, n2, t2, o2 = !t2) {
    const r2 = {};
    let i2, a2 = 0;
    for (const o3 of n2) {
      if (o3 === i2) {
        throw new RangeError(duplicateFields(o3));
      }
      if ("constructor" === o3 || "__proto__" === o3) {
        throw new RangeError(forbiddenField(o3));
      }
      let n3 = e2[o3];
      if (void 0 !== n3) {
        a2 = 1, Rm[o3] && (n3 = Rm[o3](n3, o3)), r2[o3] = n3;
      } else if (t2) {
        if (t2.includes(o3)) {
          throw new TypeError(missingField(o3));
        }
        r2[o3] = Qu[o3];
      }
      i2 = o3;
    }
    if (o2 && !a2) {
      throw new TypeError(noValidFields(n2));
    }
    return r2;
  }
  function refineTimeBag(e2, n2) {
    return constrainIsoTimeFields(zm({
      ...Qu,
      ...e2
    }), n2);
  }
  function De2(e2, n2, t2, o2, r2) {
    const { calendar: i2, timeZone: a2 } = t2, s2 = e2(i2), c2 = n2(a2), u4 = [...s2.fields(_u), ...Uu].sort(), l2 = ((e3) => {
      const n3 = he2(e3, L2), t3 = Se2(n3.offsetNanoseconds), o3 = ra(e3.calendar), [r3, i3, a3] = o3.u(n3), [s3, c3] = o3.m(r3, i3), u5 = sa(s3, c3);
      return {
        ...Ga(n3),
        year: r3,
        monthCode: u5,
        day: a3,
        offset: t3
      };
    })(t2), f2 = refineFields(o2, u4), d2 = s2.oe(l2, f2), m3 = {
      ...l2,
      ...f2
    }, [p2, h2, I3] = je2(r2, 2);
    return Xe2(getMatchingInstantFor(c2, {
      ...s2.ee(d2, fabricateOverflowOptions(p2)),
      ...constrainIsoTimeFields(zm(m3), p2)
    }, parseOffsetNano(m3.offset), h2, I3), a2, i2);
  }
  function Pt(e2, n2, t2, o2) {
    const r2 = e2(n2.calendar), i2 = [...r2.fields(_u), ...p].sort(), a2 = {
      ...computeDateEssentials(s2 = n2),
      hour: s2.isoHour,
      minute: s2.isoMinute,
      second: s2.isoSecond,
      millisecond: s2.isoMillisecond,
      microsecond: s2.isoMicrosecond,
      nanosecond: s2.isoNanosecond
    };
    var s2;
    const c2 = refineFields(t2, i2), u4 = dt(o2), l2 = r2.oe(a2, c2), f2 = {
      ...a2,
      ...c2
    };
    return jt2(Do({
      ...r2.ee(l2, fabricateOverflowOptions(u4)),
      ...constrainIsoTimeFields(zm(f2), u4)
    }));
  }
  function ee(e2, n2, t2, o2) {
    const r2 = e2(n2.calendar), i2 = r2.fields(_u).sort(), a2 = computeDateEssentials(n2), s2 = refineFields(t2, i2), c2 = r2.oe(a2, s2);
    return r2.ee(c2, o2);
  }
  function Wt2(e2, n2, t2, o2) {
    const r2 = e2(n2.calendar), i2 = r2.fields(Gu).sort(), a2 = ((e3) => {
      const n3 = ra(e3.calendar), [t3, o3] = n3.u(e3), [r3, i3] = n3.m(t3, o3);
      return {
        year: t3,
        monthCode: sa(r3, i3)
      };
    })(n2), s2 = refineFields(t2, i2), c2 = r2.oe(a2, s2);
    return r2.ne(c2, o2);
  }
  function Et(e2, n2, t2, o2) {
    const r2 = e2(n2.calendar), i2 = r2.fields(_u).sort(), a2 = ((e3) => {
      const n3 = ra(e3.calendar), [t3, o3, r3] = n3.u(e3), [i3, a3] = n3.m(t3, o3);
      return {
        monthCode: sa(i3, a3),
        day: r3
      };
    })(n2), s2 = refineFields(t2, i2), c2 = r2.oe(a2, s2);
    return r2.te(c2, o2);
  }
  function rt2(e2, n2, t2) {
    return St(((e3, n3, t3) => refineTimeBag({
      ...nn(Ru, e3),
      ...refineFields(n3, Ru)
    }, dt(t3)))(e2, n2, t2));
  }
  function N2(e2, n2) {
    return pe2((t2 = e2, o2 = n2, checkDurationUnits({
      ...t2,
      ...refineFields(o2, il)
    })));
    var t2, o2;
  }
  function convertToPlainMonthDay(e2, n2) {
    const t2 = refineCalendarFields(e2, n2, Ku);
    return e2.te(t2);
  }
  function convertToPlainYearMonth(e2, n2, t2) {
    const o2 = refineCalendarFields(e2, n2, Vu);
    return e2.ne(o2, t2);
  }
  function convertToIso(e2, n2, t2, o2, r2) {
    n2 = nn(t2 = e2.fields(t2), n2), o2 = refineFields(o2, r2 = e2.fields(r2), []);
    let i2 = e2.oe(n2, o2);
    return i2 = refineFields(i2, [...t2, ...r2].sort(), []), e2.ee(i2);
  }
  function nativeDateFromFields(e2, n2) {
    const t2 = dt(n2), o2 = refineYear(this, e2), r2 = refineMonth(this, e2, o2, t2), i2 = refineDay(this, e2, r2, o2, t2);
    return W2(To(this.U(o2, r2, i2)), this.id || l);
  }
  function nativeYearMonthFromFields(e2, n2) {
    const t2 = dt(n2), o2 = refineYear(this, e2), r2 = refineMonth(this, e2, o2, t2);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.U(o2, r2, 1)), this.id || l);
  }
  function nativeMonthDayFromFields(e2, n2) {
    const t2 = dt(n2);
    let o2, r2, i2, a2 = void 0 !== e2.eraYear || void 0 !== e2.year ? refineYear(this, e2) : void 0;
    const s2 = !this.id;
    if (void 0 === a2 && s2 && (a2 = Pl), void 0 !== a2) {
      const n3 = refineMonth(this, e2, a2, t2);
      o2 = refineDay(this, e2, n3, a2, t2);
      const s3 = this.F(a2);
      r2 = monthToMonthCodeNumber(n3, s3), i2 = n3 === s3;
    } else {
      if (void 0 === e2.monthCode) {
        throw new TypeError(lu);
      }
      if ([r2, i2] = parseMonthCode(e2.monthCode), this.id && this.id !== Xu && this.id !== el) {
        if (this.id && "coptic" === computeCalendarIdBase(this.id) && 0 === t2) {
          const n3 = i2 || 13 !== r2 ? 30 : 6;
          o2 = e2.day, o2 = clampNumber(o2, 1, n3);
        } else if (this.id && "chinese" === computeCalendarIdBase(this.id) && 0 === t2) {
          const n3 = !i2 || 1 !== r2 && 9 !== r2 && 10 !== r2 && 11 !== r2 && 12 !== r2 ? 30 : 29;
          o2 = e2.day, o2 = clampNumber(o2, 1, n3);
        } else {
          o2 = e2.day;
        }
      } else {
        o2 = refineDay(this, e2, refineMonth(this, e2, Pl, t2), Pl, t2);
      }
    }
    const c2 = this.R(r2, i2, o2);
    if (!c2) {
      throw new RangeError("Cannot guess year");
    }
    const [u4, f2] = c2;
    return createPlainMonthDaySlots(To(this.U(u4, f2, o2)), this.id || l);
  }
  function nativeFieldsMethod(e2) {
    return getCalendarEraOrigins(this) && e2.includes("year") ? [...e2, ...qu] : e2;
  }
  function nativeMergeFields(e2, n2) {
    const t2 = Object.assign(/* @__PURE__ */ Object.create(null), e2);
    return spliceFields(t2, n2, $u), getCalendarEraOrigins(this) && (spliceFields(t2, n2, Lu), this.id === el && spliceFields(t2, n2, Ju, qu)), t2;
  }
  function refineYear(e2, n2) {
    const t2 = getCalendarEraOrigins(e2), o2 = tl[e2.id || ""] || {};
    let { era: r2, eraYear: i2, year: a2 } = n2;
    if (void 0 !== r2 || void 0 !== i2) {
      if (void 0 === r2 || void 0 === i2) {
        throw new TypeError(su);
      }
      if (!t2) {
        throw new RangeError(iu);
      }
      const e3 = t2[o2[r2] || r2];
      if (void 0 === e3) {
        throw new RangeError(invalidEra(r2));
      }
      const n3 = eraYearToYear(i2, e3);
      if (void 0 !== a2 && a2 !== n3) {
        throw new RangeError(cu);
      }
      a2 = n3;
    } else if (void 0 === a2) {
      throw new TypeError(missingYear(t2));
    }
    return a2;
  }
  function refineMonth(e2, n2, t2, o2) {
    let { month: r2, monthCode: i2 } = n2;
    if (void 0 !== i2) {
      const n3 = ((e3, n4, t3, o3) => {
        const r3 = e3.F(t3), [i3, a2] = parseMonthCode(n4);
        let s2 = monthCodeNumberToMonth(i3, a2, r3);
        if (a2) {
          const n5 = getCalendarLeapMonthMeta(e3);
          if (void 0 === n5) {
            throw new RangeError(fu);
          }
          if (n5 > 0) {
            if (s2 > n5) {
              throw new RangeError(fu);
            }
            if (void 0 === r3) {
              if (1 === o3) {
                throw new RangeError(fu);
              }
              s2--;
            }
          } else {
            if (s2 !== -n5) {
              throw new RangeError(fu);
            }
            if (void 0 === r3 && 1 === o3) {
              throw new RangeError(fu);
            }
          }
        }
        return s2;
      })(e2, i2, t2, o2);
      if (void 0 !== r2 && r2 !== n3) {
        throw new RangeError(uu);
      }
      r2 = n3, o2 = 1;
    } else if (void 0 === r2) {
      throw new TypeError(lu);
    }
    return ba("month", r2, 1, e2.O(t2), o2);
  }
  function refineDay(e2, n2, t2, o2, r2) {
    return clampProp(n2, "day", 1, e2.B(o2, t2), r2);
  }
  function spliceFields(e2, n2, t2, o2) {
    let r2 = 0;
    const i2 = [];
    for (const e3 of t2) {
      void 0 !== n2[e3] ? r2 = 1 : i2.push(e3);
    }
    if (Object.assign(e2, n2), r2) {
      for (const n3 of o2 || i2) {
        delete e2[n3];
      }
    }
  }
  function computeDateEssentials(e2) {
    const n2 = ra(e2.calendar), [t2, o2, r2] = n2.u(e2), [i2, a2] = n2.m(t2, o2);
    return {
      year: t2,
      monthCode: sa(i2, a2),
      day: r2
    };
  }
  function qe2(e2) {
    return xe(io(bigIntToBigNano(toBigInt(e2))));
  }
  function ye2(e2, n2, t2, o2, r2 = l) {
    return Xe2(io(bigIntToBigNano(toBigInt(t2))), n2(o2), e2(r2));
  }
  function Mt(n2, t2, o2, r2, i2 = 0, a2 = 0, s2 = 0, c2 = 0, u4 = 0, f2 = 0, d2 = l) {
    return jt2(Do(checkIsoDateTimeFields(e(Za, zipProps(pl, [t2, o2, r2, i2, a2, s2, c2, u4, f2])))), n2(d2));
  }
  function ue2(n2, t2, o2, r2, i2 = l) {
    return W2(To(checkIsoDateFields(e(Za, {
      isoYear: t2,
      isoMonth: o2,
      isoDay: r2
    }))), n2(i2));
  }
  function Kt2(e2, n2, t2, o2 = l, r2 = 1) {
    const i2 = Za(n2), a2 = Za(t2), s2 = e2(o2);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
      isoYear: i2,
      isoMonth: a2,
      isoDay: Za(r2)
    })), s2);
  }
  function kt(e2, n2, t2, o2 = l, r2 = Pl) {
    const i2 = Za(n2), a2 = Za(t2), s2 = e2(o2);
    return createPlainMonthDaySlots(To(checkIsoDateFields({
      isoYear: Za(r2),
      isoMonth: i2,
      isoDay: a2
    })), s2);
  }
  function ut(n2 = 0, t2 = 0, o2 = 0, r2 = 0, i2 = 0, a2 = 0) {
    return St(constrainIsoTimeFields(e(Za, zipProps(w2, [n2, t2, o2, r2, i2, a2])), 1));
  }
  function j2(n2 = 0, t2 = 0, o2 = 0, r2 = 0, i2 = 0, a2 = 0, s2 = 0, c2 = 0, u4 = 0, l2 = 0) {
    return pe2(checkDurationUnits(e(Ba, zipProps(O2, [n2, t2, o2, r2, i2, a2, s2, c2, u4, l2]))));
  }
  function Je2(e2, n2, t2 = l) {
    return Xe2(e2.epochNanoseconds, n2, t2);
  }
  function Ce2(e2) {
    return xe(e2.epochNanoseconds);
  }
  function yt(e2, n2) {
    return jt2(he2(n2, e2));
  }
  function fe2(e2, n2) {
    return W2(he2(n2, e2));
  }
  function mt(e2, n2) {
    return St(he2(n2, e2));
  }
  function Ct(e2, n2, t2, o2) {
    const r2 = ((e3, n3, t3, o3) => {
      const r3 = ((e4) => Vl(normalizeOptions(e4)))(o3);
      return $o(e3(n3), t3, r3);
    })(e2, t2, n2, o2);
    return Xe2(io(r2), t2, n2.calendar);
  }
  function ae2(e2, n2, t2, o2, r2) {
    const i2 = e2(r2.timeZone), a2 = r2.plainTime, s2 = void 0 !== a2 ? n2(a2) : void 0, c2 = t2(i2);
    let u4;
    return u4 = s2 ? $o(c2, {
      ...o2,
      ...s2
    }) : getStartOfDayInstantFor(c2, {
      ...o2,
      ...At
    }), Xe2(u4, i2, o2.calendar);
  }
  function ie2(e2, n2 = At) {
    return jt2(Do({
      ...e2,
      ...n2
    }));
  }
  function le2(e2, n2, t2) {
    return convertToPlainYearMonth(e2(n2.calendar), t2);
  }
  function se2(e2, n2, t2) {
    return convertToPlainMonthDay(e2(n2.calendar), t2);
  }
  function $t(e2, n2, t2, o2) {
    return ((e3, n3, t3) => convertToIso(e3, n3, Vu, oa(t3), Hu))(e2(n2.calendar), t2, o2);
  }
  function Vt2(e2, n2, t2, o2) {
    return ((e3, n3, t3) => convertToIso(e3, n3, Ku, oa(t3), Wu))(e2(n2.calendar), t2, o2);
  }
  function ze2(e2) {
    return xe(io(Ge2(Ba(e2), Ke2)));
  }
  function $e2(e2) {
    return xe(io(bigIntToBigNano(toBigInt(e2))));
  }
  function createOptionsTransformer(e2, n2, t2) {
    const o2 = new Set(t2);
    return (r2, i2) => {
      const a2 = t2 && hasAnyPropsByName(r2, t2);
      if (!hasAnyPropsByName(r2 = ((e3, n3) => {
        const t3 = {};
        for (const o3 in n3) {
          e3.has(o3) || (t3[o3] = n3[o3]);
        }
        return t3;
      })(o2, r2), e2)) {
        if (i2 && a2) {
          throw new TypeError("Invalid formatting options");
        }
        r2 = {
          ...n2,
          ...r2
        };
      }
      return t2 && (r2.timeZone = nf, ["full", "long"].includes(r2.ie) && (r2.ie = "medium")), r2;
    };
  }
  function K2(e2, n2 = an, t2 = 0) {
    const [o2, , , r2] = e2;
    return (i2, a2 = mp, ...s2) => {
      const c2 = n2(r2 && r2(...s2), i2, a2, o2, t2), u4 = c2.resolvedOptions();
      return [c2, ...toEpochMillis(e2, u4, s2)];
    };
  }
  function an(e2, n2, t2, o2, r2) {
    if (t2 = o2(t2, r2), e2) {
      if (void 0 !== t2.timeZone) {
        throw new TypeError(Ou);
      }
      t2.timeZone = e2;
    }
    return new en(n2, t2);
  }
  function computeNonBuggyIsoResolve() {
    return new en(void 0, {
      calendar: l
    }).resolvedOptions().calendar === l;
  }
  function toEpochMillis(e2, n2, t2) {
    const [, o2, r2] = e2;
    return t2.map(((e3) => (e3.calendar && ((e4, n3, t3) => {
      if ((t3 || e4 !== l) && e4 !== n3) {
        throw new RangeError(mu);
      }
    })(e3.calendar, n2.calendar, r2), o2(e3, n2))));
  }
  function Pe2(e2, n2, t2) {
    const o2 = n2.timeZone, r2 = e2(o2), i2 = {
      ...he2(n2, r2),
      ...t2 || At
    };
    let a2;
    return a2 = t2 ? getMatchingInstantFor(r2, i2, i2.offsetNanoseconds, 2) : getStartOfDayInstantFor(r2, i2), Xe2(a2, o2, n2.calendar);
  }
  function pt(e2, n2 = At) {
    return jt2(Do({
      ...e2,
      ...n2
    }));
  }
  function Ot(e2, n2) {
    return {
      ...e2,
      calendar: n2
    };
  }
  function ge2(e2, n2) {
    return {
      ...e2,
      timeZone: n2
    };
  }
  function tn(e2) {
    const n2 = Ue2();
    return So(n2, e2.N(n2));
  }
  function Ue2() {
    return Ge2(Date.now(), Ke2);
  }
  function Qe2() {
    return new en().resolvedOptions().timeZone;
  }
  var expectedInteger = (e2, n2) => `Non-integer ${e2}: ${n2}`;
  var expectedPositive = (e2, n2) => `Non-positive ${e2}: ${n2}`;
  var expectedFinite = (e2, n2) => `Non-finite ${e2}: ${n2}`;
  var forbiddenBigIntToNumber = (e2) => `Cannot convert bigint to ${e2}`;
  var invalidBigInt = (e2) => `Invalid bigint: ${e2}`;
  var ou = "Cannot convert Symbol to string";
  var ru = "Invalid object";
  var numberOutOfRange = (e2, n2, t2, o2, r2) => r2 ? numberOutOfRange(e2, r2[n2], r2[t2], r2[o2]) : invalidEntity(e2, n2) + `; must be between ${t2}-${o2}`;
  var invalidEntity = (e2, n2) => `Invalid ${e2}: ${n2}`;
  var missingField = (e2) => `Missing ${e2}`;
  var forbiddenField = (e2) => `Invalid field ${e2}`;
  var duplicateFields = (e2) => `Duplicate field ${e2}`;
  var noValidFields = (e2) => "No valid fields: " + e2.join();
  var i = "Invalid bag";
  var invalidChoice = (e2, n2, t2) => invalidEntity(e2, n2) + "; must be " + Object.keys(t2).join();
  var C2 = "Cannot use valueOf";
  var a = "Invalid calling context";
  var iu = "Forbidden era/eraYear";
  var su = "Mismatching era/eraYear";
  var cu = "Mismatching year/eraYear";
  var invalidEra = (e2) => `Invalid era: ${e2}`;
  var missingYear = (e2) => "Missing year" + (e2 ? "/era/eraYear" : "");
  var invalidMonthCode = (e2) => `Invalid monthCode: ${e2}`;
  var uu = "Mismatching month/monthCode";
  var lu = "Missing month/monthCode";
  var fu = "Invalid leap month";
  var du = "Invalid protocol results";
  var c = (e2) => invalidEntity("Calendar", e2);
  var mu = "Mismatching Calendars";
  var F2 = (e2) => invalidEntity("TimeZone", e2);
  var pu = "Mismatching TimeZones";
  var hu = "Forbidden ICU TimeZone";
  var Iu = "Out-of-bounds offset";
  var Du = "Out-of-bounds TimeZone gap";
  var gu = "Invalid TimeZone offset";
  var Tu = "Ambiguous offset";
  var Mu = "Out-of-bounds date";
  var yu = "Out-of-bounds duration";
  var Nu = "Cannot mix duration signs";
  var vu = "Missing relativeTo";
  var Pu = "Cannot use large units";
  var Fu = "Required smallestUnit or largestUnit";
  var Eu = "smallestUnit > largestUnit";
  var failedParse = (e2) => `Cannot parse: ${e2}`;
  var invalidSubstring = (e2) => `Invalid substring: ${e2}`;
  var rn = (e2) => `Cannot format ${e2}`;
  var ln = "Mismatching types for formatting";
  var Ou = "Cannot specify TimeZone";
  var bu = /* @__PURE__ */ gt(P2, ((e2, n2) => n2));
  var Su = /* @__PURE__ */ gt(P2, ((e2, n2, t2) => t2));
  var wu = /* @__PURE__ */ gt(padNumber, 2);
  var Bu = {
    nanosecond: 0,
    microsecond: 1,
    millisecond: 2,
    second: 3,
    minute: 4,
    hour: 5,
    day: 6,
    week: 7,
    month: 8,
    year: 9
  };
  var Yu = /* @__PURE__ */ Object.keys(Bu);
  var Cu = 864e5;
  var ku = 1e3;
  var ro = 1e3;
  var Ke2 = 1e6;
  var oo = 1e9;
  var ao = 6e10;
  var no = 36e11;
  var go = 864e11;
  var Zu = [1, ro, Ke2, oo, ao, no, go];
  var p = /* @__PURE__ */ Yu.slice(0, 6);
  var Ru = /* @__PURE__ */ sortStrings(p);
  var zu = ["offset"];
  var Au = ["timeZone"];
  var Uu = /* @__PURE__ */ p.concat(zu);
  var ju = /* @__PURE__ */ Uu.concat(Au);
  var qu = ["era", "eraYear"];
  var Lu = /* @__PURE__ */ qu.concat(["year"]);
  var Wu = ["year"];
  var xu = ["monthCode"];
  var $u = /* @__PURE__ */ ["month"].concat(xu);
  var Hu = ["day"];
  var Gu = /* @__PURE__ */ $u.concat(Wu);
  var Vu = /* @__PURE__ */ xu.concat(Wu);
  var _u = /* @__PURE__ */ Hu.concat(Gu);
  var Ju = /* @__PURE__ */ Hu.concat($u);
  var Ku = /* @__PURE__ */ Hu.concat(xu);
  var Qu = /* @__PURE__ */ Su(p, 0);
  var l = "iso8601";
  var Xu = "gregory";
  var el = "japanese";
  var nl = {
    [Xu]: {
      "gregory-inverse": -1,
      gregory: 0
    },
    [el]: {
      "japanese-inverse": -1,
      japanese: 0,
      meiji: 1867,
      taisho: 1911,
      showa: 1925,
      heisei: 1988,
      reiwa: 2018
    },
    ethiopic: {
      ethioaa: 0,
      ethiopic: 5500
    },
    coptic: {
      "coptic-inverse": -1,
      coptic: 0
    },
    roc: {
      "roc-inverse": -1,
      roc: 0
    },
    buddhist: {
      be: 0
    },
    islamic: {
      ah: 0
    },
    indian: {
      saka: 0
    },
    persian: {
      ap: 0
    }
  };
  var tl = {
    [Xu]: {
      bce: "gregory-inverse",
      ce: "gregory"
    },
    [el]: {
      bce: "japanese-inverse",
      ce: "japanese"
    },
    ethiopic: {
      era0: "ethioaa",
      era1: "ethiopic"
    },
    coptic: {
      era0: "coptic-inverse",
      era1: "coptic"
    },
    roc: {
      broc: "roc-inverse",
      minguo: "roc"
    }
  };
  var ol = {
    chinese: 13,
    dangi: 13,
    hebrew: -6
  };
  var d = /* @__PURE__ */ gt(requireType, "string");
  var D2 = /* @__PURE__ */ gt(requireType, "boolean");
  var rl = /* @__PURE__ */ gt(requireType, "number");
  var O2 = /* @__PURE__ */ Yu.map(((e2) => e2 + "s"));
  var il = /* @__PURE__ */ sortStrings(O2);
  var al = /* @__PURE__ */ O2.slice(0, 6);
  var sl = /* @__PURE__ */ O2.slice(6);
  var cl = /* @__PURE__ */ sl.slice(1);
  var ul = /* @__PURE__ */ bu(O2);
  var ll = /* @__PURE__ */ Su(O2, 0);
  var fl = /* @__PURE__ */ Su(al, 0);
  var dl = /* @__PURE__ */ gt(zeroOutProps, O2);
  var w2 = ["isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour"];
  var ml = ["isoDay", "isoMonth", "isoYear"];
  var pl = /* @__PURE__ */ w2.concat(ml);
  var Ca = /* @__PURE__ */ sortStrings(ml);
  var hl = /* @__PURE__ */ sortStrings(w2);
  var Il = /* @__PURE__ */ sortStrings(pl);
  var At = /* @__PURE__ */ Su(hl, 0);
  var Ra = /* @__PURE__ */ gt(zeroOutProps, pl);
  var Dl = 1e8;
  var gl = Dl * Cu;
  var Tl = [Dl, 0];
  var Ml = [-Dl, 0];
  var yl = 275760;
  var Nl = -271821;
  var en = Intl.DateTimeFormat;
  var vl = 1970;
  var Pl = 1972;
  var Fl = 12;
  var El = /* @__PURE__ */ isoArgsToEpochMilli(1868, 9, 8);
  var Ol = /* @__PURE__ */ on(computeJapaneseEraParts, WeakMap);
  var bl = "smallestUnit";
  var Sl = "unit";
  var wl = "roundingMode";
  var Bl = "roundingIncrement";
  var Yl = "fractionalSecondDigits";
  var Cl = "relativeTo";
  var kl = "direction";
  var Zl = {
    constrain: 0,
    reject: 1
  };
  var Rl = /* @__PURE__ */ Object.keys(Zl);
  var zl = {
    compatible: 0,
    reject: 1,
    earlier: 2,
    later: 3
  };
  var Al = {
    reject: 0,
    use: 1,
    prefer: 2,
    ignore: 3
  };
  var Ul = {
    auto: 0,
    never: 1,
    critical: 2,
    always: 3
  };
  var jl = {
    auto: 0,
    never: 1,
    critical: 2
  };
  var ql = {
    auto: 0,
    never: 1
  };
  var Ll = {
    floor: 0,
    halfFloor: 1,
    ceil: 2,
    halfCeil: 3,
    trunc: 4,
    halfTrunc: 5,
    expand: 6,
    halfExpand: 7,
    halfEven: 8
  };
  var Wl = {
    previous: -1,
    next: 1
  };
  var xl = /* @__PURE__ */ gt(refineUnitOption, bl);
  var $l = /* @__PURE__ */ gt(refineUnitOption, "largestUnit");
  var Hl = /* @__PURE__ */ gt(refineUnitOption, Sl);
  var Gl = /* @__PURE__ */ gt(refineChoiceOption, "overflow", Zl);
  var Vl = /* @__PURE__ */ gt(refineChoiceOption, "disambiguation", zl);
  var _l = /* @__PURE__ */ gt(refineChoiceOption, "offset", Al);
  var Jl = /* @__PURE__ */ gt(refineChoiceOption, "calendarName", Ul);
  var Kl = /* @__PURE__ */ gt(refineChoiceOption, "timeZoneName", jl);
  var Ql = /* @__PURE__ */ gt(refineChoiceOption, "offset", ql);
  var Xl = /* @__PURE__ */ gt(refineChoiceOption, wl, Ll);
  var Qt = "PlainYearMonth";
  var qt = "PlainMonthDay";
  var G2 = "PlainDate";
  var x2 = "PlainDateTime";
  var ft = "PlainTime";
  var _2 = "ZonedDateTime";
  var Re2 = "Instant";
  var A = "Duration";
  var ef = [Math.floor, (e2) => hasHalf(e2) ? Math.floor(e2) : Math.round(e2), Math.ceil, (e2) => hasHalf(e2) ? Math.ceil(e2) : Math.round(e2), Math.trunc, (e2) => hasHalf(e2) ? Math.trunc(e2) || 0 : Math.round(e2), (e2) => e2 < 0 ? Math.floor(e2) : Math.ceil(e2), (e2) => Math.sign(e2) * Math.round(Math.abs(e2)) || 0, (e2) => hasHalf(e2) ? (e2 = Math.trunc(e2) || 0) + e2 % 2 : Math.round(e2)];
  var nf = "UTC";
  var tf = 5184e3;
  var of = /* @__PURE__ */ isoArgsToEpochSec(1847);
  var rf = /* @__PURE__ */ isoArgsToEpochSec((() => {
    const e2 = /* @__PURE__ */ new Date();
    return (0 === e2.getTime() ? 2040 : e2.getUTCFullYear()) + 10;
  })());
  var af = /0+$/;
  var he2 = /* @__PURE__ */ on(_zonedEpochSlotsToIso, WeakMap);
  var sf = 2 ** 32 - 1;
  var L2 = /* @__PURE__ */ on(((e2) => {
    const n2 = getTimeZoneEssence(e2);
    return "object" == typeof n2 ? new IntlTimeZone(n2) : new FixedTimeZone(n2 || 0);
  }));
  var FixedTimeZone = class {
    constructor(e2) {
      this.j = e2;
    }
    N() {
      return this.j;
    }
    v(e2) {
      return ((e3) => {
        const n2 = ma({
          ...e3,
          ...At
        });
        if (!n2 || Math.abs(n2[0]) > 1e8) {
          throw new RangeError(Mu);
        }
      })(e2), [isoToEpochNanoWithOffset(e2, this.j)];
    }
    l() {
    }
  };
  var IntlTimeZone = class {
    constructor(e2) {
      this.ae = ((e3) => {
        function getOffsetSec(e4) {
          const i2 = clampNumber(e4, o2, r2), [a2, s2] = computePeriod(i2), c2 = n2(a2), u4 = n2(s2);
          return c2 === u4 ? c2 : pinch(t2(a2, s2), c2, u4, e4);
        }
        function pinch(n3, t3, o3, r3) {
          let i2, a2;
          for (; (void 0 === r3 || void 0 === (i2 = r3 < n3[0] ? t3 : r3 >= n3[1] ? o3 : void 0)) && (a2 = n3[1] - n3[0]); ) {
            const t4 = n3[0] + Math.floor(a2 / 2);
            e3(t4) === o3 ? n3[1] = t4 : n3[0] = t4 + 1;
          }
          return i2;
        }
        const n2 = on(e3), t2 = on(createSplitTuple);
        let o2 = of, r2 = rf;
        return {
          se(e4) {
            const n3 = getOffsetSec(e4 - 86400), t3 = getOffsetSec(e4 + 86400), o3 = e4 - n3, r3 = e4 - t3;
            if (n3 === t3) {
              return [o3];
            }
            const i2 = getOffsetSec(o3);
            return i2 === getOffsetSec(r3) ? [e4 - i2] : n3 > t3 ? [o3, r3] : [];
          },
          ue: getOffsetSec,
          l(e4, i2) {
            const a2 = clampNumber(e4, o2, r2);
            let [s2, c2] = computePeriod(a2);
            const u4 = tf * i2, l2 = i2 < 0 ? () => c2 > o2 || (o2 = a2, 0) : () => s2 < r2 || (r2 = a2, 0);
            for (; l2(); ) {
              const o3 = n2(s2), r3 = n2(c2);
              if (o3 !== r3) {
                const n3 = t2(s2, c2);
                pinch(n3, o3, r3);
                const a3 = n3[0];
                if ((compareNumbers(a3, e4) || 1) === i2) {
                  return a3;
                }
              }
              s2 += u4, c2 += u4;
            }
          }
        };
      })(/* @__PURE__ */ ((e3) => (n2) => {
        const t2 = hashIntlFormatParts(e3, n2 * ku);
        return isoArgsToEpochSec(parseIntlPartsYear(t2), parseInt(t2.month), parseInt(t2.day), parseInt(t2.hour), parseInt(t2.minute), parseInt(t2.second)) - n2;
      })(e2));
    }
    N(e2) {
      return this.ae.ue(epochNanoToSec(e2)) * oo;
    }
    v(e2) {
      const [n2, t2] = [isoArgsToEpochSec((o2 = e2).isoYear, o2.isoMonth, o2.isoDay, o2.isoHour, o2.isoMinute, o2.isoSecond), o2.isoMillisecond * Ke2 + o2.isoMicrosecond * ro + o2.isoNanosecond];
      var o2;
      return this.ae.se(n2).map(((e3) => io(Ta(Ge2(e3, oo), t2))));
    }
    l(e2, n2) {
      const [t2, o2] = epochNanoToSecMod(e2), r2 = this.ae.l(t2 + (n2 > 0 || o2 ? 1 : 0), n2);
      if (void 0 !== r2) {
        return Ge2(r2, oo);
      }
    }
  };
  var cf = "([+-])";
  var uf = "(?:[.,](\\d{1,9}))?";
  var lf = `(?:(?:${cf}(\\d{6}))|(\\d{4}))-?(\\d{2})`;
  var ff = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + uf + ")?)?";
  var df = cf + ff;
  var mf = lf + "-?(\\d{2})(?:[T ]" + ff + "(Z|" + df + ")?)?";
  var pf = "\\[(!?)([^\\]]*)\\]";
  var hf = `((?:${pf}){0,9})`;
  var If = /* @__PURE__ */ createRegExp(lf + hf);
  var Df = /* @__PURE__ */ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + hf);
  var gf = /* @__PURE__ */ createRegExp(mf + hf);
  var Tf = /* @__PURE__ */ createRegExp("T?" + ff + "(?:" + df + ")?" + hf);
  var Mf = /* @__PURE__ */ createRegExp(df);
  var yf = /* @__PURE__ */ new RegExp(pf, "g");
  var Nf = /* @__PURE__ */ createRegExp(`${cf}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${uf}H)?(?:(\\d+)${uf}M)?(?:(\\d+)${uf}S)?)?`);
  var vf = /* @__PURE__ */ on(((e2) => new en("en", {
    calendar: l,
    timeZone: e2,
    era: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: 0
  })));
  var Pf = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/;
  var Ff = /[^\w\/:+-]+/;
  var Ef = /^M(\d{2})(L?)$/;
  var Of = /* @__PURE__ */ on(createIntlCalendar);
  var bf = /* @__PURE__ */ on(((e2) => new en("en", {
    calendar: e2,
    timeZone: nf,
    era: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: 0
  })));
  var kf = {
    P: nativeDateAdd,
    h: nativeDateUntil,
    ee: nativeDateFromFields,
    ne: nativeYearMonthFromFields,
    te: nativeMonthDayFromFields,
    fields: nativeFieldsMethod,
    oe: nativeMergeFields,
    inLeapYear: computeNativeInLeapYear,
    monthsInYear: computeNativeMonthsInYear,
    daysInMonth: computeNativeDaysInMonth,
    daysInYear: computeNativeDaysInYear,
    dayOfYear: computeNativeDayOfYear,
    era(e2) {
      return this.$(e2)[0];
    },
    eraYear(e2) {
      return this.$(e2)[1];
    },
    monthCode(e2) {
      const [n2, t2] = this.u(e2), [o2, r2] = this.m(n2, t2);
      return sa(o2, r2);
    },
    dayOfWeek: Ha,
    daysInWeek: fo
  };
  var Kf = {
    u: computeIsoDateParts,
    $: computeIsoEraParts,
    m: computeIsoMonthCodeParts
  };
  var tm = {
    dayOfYear: computeNativeDayOfYear,
    u: computeIsoDateParts,
    M: isoArgsToEpochMilli
  };
  var om = /* @__PURE__ */ Object.assign({}, tm, {
    weekOfYear: computeNativeWeekOfYear,
    yearOfWeek: computeNativeYearOfWeek,
    I(e2) {
      function computeWeekShift(e3) {
        return (7 - e3 < n2 ? 7 : 0) - e3;
      }
      function computeWeeksInYear(e3) {
        const n3 = computeIsoDaysInYear(l2 + e3), t3 = e3 || 1, o3 = computeWeekShift(modFloor(a2 + n3 * t3, 7));
        return c2 = (n3 + (o3 - s2) * t3) / 7;
      }
      const n2 = this.id ? 1 : 4, t2 = Ha(e2), o2 = this.dayOfYear(e2), r2 = modFloor(t2 - 1, 7), i2 = o2 - 1, a2 = modFloor(r2 - i2, 7), s2 = computeWeekShift(a2);
      let c2, u4 = Math.floor((i2 - s2) / 7) + 1, l2 = e2.isoYear;
      return u4 ? u4 > computeWeeksInYear(0) && (u4 = 1, l2++) : (u4 = computeWeeksInYear(-1), l2--), [u4, l2, c2];
    }
  });
  var im = /* @__PURE__ */ Object.assign({}, kf, om, {
    u: computeIsoDateParts,
    $: computeIsoEraParts,
    m: computeIsoMonthCodeParts,
    R: computeIsoYearMonthForMonthDay,
    L: computeIsoInLeapYear,
    F: noop,
    O: computeIsoMonthsInYear,
    q: computeIsoMonthsInYearSpan,
    B: computeIsoDaysInMonth,
    G: computeIsoDaysInYear,
    U: computeIsoFieldsFromParts,
    M: isoArgsToEpochMilli,
    p: isoMonthAdd,
    year(e2) {
      return e2.isoYear;
    },
    month(e2) {
      return e2.isoMonth;
    },
    day: computeIsoDay
  });
  var Nm = {
    u: computeIntlDateParts,
    $: computeIntlEraParts,
    m: computeIntlMonthCodeParts
  };
  var Om = {
    dayOfYear: computeNativeDayOfYear,
    u: computeIntlDateParts,
    M: computeIntlEpochMilli
  };
  var bm = {
    I() {
      return [];
    }
  };
  var Sm = /* @__PURE__ */ Object.assign({}, Om, bm, {
    weekOfYear: computeNativeWeekOfYear,
    yearOfWeek: computeNativeYearOfWeek
  });
  var Bm = /* @__PURE__ */ Object.assign({}, kf, Sm, {
    u: computeIntlDateParts,
    $: computeIntlEraParts,
    m: computeIntlMonthCodeParts,
    R: computeIntlYearMonthForMonthDay,
    L: computeIntlInLeapYear,
    F: computeIntlLeapMonth,
    O: computeIntlMonthsInYear,
    q: computeIntlMonthsInYearSpan,
    B: computeIntlDaysInMonth,
    G: computeIntlDaysInYear,
    U: computeIsoFieldsFromIntlParts,
    M: computeIntlEpochMilli,
    p: intlMonthAdd,
    year(e2) {
      return this._(e2).year;
    },
    month(e2) {
      const { year: n2, V: t2 } = this._(e2), { X: o2 } = this.J(n2);
      return o2[t2] + 1;
    },
    day: computeIntlDay
  });
  var ra = /* @__PURE__ */ createNativeOpsCreator(Kf, Nm);
  var v2 = /* @__PURE__ */ createNativeOpsCreator(im, Bm);
  var Ym = {
    era: toStringViaPrimitive,
    eraYear: Za,
    year: Za,
    month: toPositiveInteger,
    monthCode(e2) {
      const n2 = toStringViaPrimitive(e2);
      return parseMonthCode(n2), n2;
    },
    day: toPositiveInteger
  };
  var Cm = /* @__PURE__ */ Su(p, Za);
  var km = /* @__PURE__ */ Su(O2, Ba);
  var Zm = {
    offset(e2) {
      const n2 = toStringViaPrimitive(e2);
      return parseOffsetNano(n2), n2;
    }
  };
  var Rm = /* @__PURE__ */ Object.assign({}, Ym, Cm, km, Zm);
  var zm = /* @__PURE__ */ gt(remapProps, p, w2);
  var Ga = /* @__PURE__ */ gt(remapProps, w2, p);
  var Am = "numeric";
  var Um = ["timeZoneName"];
  var jm = {
    month: Am,
    day: Am
  };
  var qm = {
    year: Am,
    month: Am
  };
  var Lm = /* @__PURE__ */ Object.assign({}, qm, {
    day: Am
  });
  var Wm = {
    hour: Am,
    minute: Am,
    second: Am
  };
  var xm = /* @__PURE__ */ Object.assign({}, Lm, Wm);
  var $m = /* @__PURE__ */ Object.assign({}, xm, {
    timeZoneName: "short"
  });
  var Hm = /* @__PURE__ */ Object.keys(qm);
  var Gm = /* @__PURE__ */ Object.keys(jm);
  var Vm = /* @__PURE__ */ Object.keys(Lm);
  var _m = /* @__PURE__ */ Object.keys(Wm);
  var Jm = ["dateStyle"];
  var Km = /* @__PURE__ */ Hm.concat(Jm);
  var Qm = /* @__PURE__ */ Gm.concat(Jm);
  var Xm = /* @__PURE__ */ Vm.concat(Jm, ["weekday"]);
  var ep = /* @__PURE__ */ _m.concat(["dayPeriod", "timeStyle", "fractionalSecondDigits"]);
  var np = /* @__PURE__ */ Xm.concat(ep);
  var tp = /* @__PURE__ */ Um.concat(ep);
  var op = /* @__PURE__ */ Um.concat(Xm);
  var rp = /* @__PURE__ */ Um.concat(["day", "weekday"], ep);
  var ip = /* @__PURE__ */ Um.concat(["year", "weekday"], ep);
  var ap = /* @__PURE__ */ createOptionsTransformer(np, xm);
  var sp = /* @__PURE__ */ createOptionsTransformer(np, $m);
  var cp = /* @__PURE__ */ createOptionsTransformer(np, xm, Um);
  var up = /* @__PURE__ */ createOptionsTransformer(Xm, Lm, tp);
  var lp = /* @__PURE__ */ createOptionsTransformer(ep, Wm, op);
  var fp = /* @__PURE__ */ createOptionsTransformer(Km, qm, rp);
  var dp = /* @__PURE__ */ createOptionsTransformer(Qm, jm, ip);
  var mp = {};
  var pp = /* @__PURE__ */ computeNonBuggyIsoResolve();
  var Q2 = [ap, I2];
  var ot = [sp, I2, 0, (e2, n2) => {
    const t2 = e2.timeZone;
    if (n2 && n2.timeZone !== t2) {
      throw new RangeError(pu);
    }
    return t2;
  }];
  var U2 = [cp, isoToEpochMilli];
  var X2 = [up, isoToEpochMilli];
  var tt2 = [lp, (e2) => isoTimeFieldsToNano(e2) / Ke2];
  var et2 = [fp, isoToEpochMilli, pp];
  var nt2 = [dp, isoToEpochMilli, pp];

  // node_modules/temporal-polyfill/chunks/classApi.js
  function createSlotClass(i2, l2, s2, c2, u4, f2) {
    function Class(...t2) {
      if (!(this instanceof Class)) {
        throw new TypeError(a);
      }
      {
        const e2 = l2(...t2);
        un(this, e2), dbg(this, e2, f2);
      }
    }
    function bindMethod(t2, e2) {
      return Object.defineProperties((function(...e3) {
        return t2.call(this, getSpecificSlots(this), ...e3);
      }), r(e2));
    }
    function getSpecificSlots(t2) {
      const e2 = cn(t2);
      if (!e2 || e2.branding !== i2) {
        throw new TypeError(a);
      }
      return e2;
    }
    return Object.defineProperties(Class.prototype, {
      ...t(e(bindMethod, s2)),
      ...n(e(bindMethod, c2)),
      ...o("Temporal." + i2)
    }), Object.defineProperties(Class, {
      ...n(u4),
      ...r(i2)
    }), [Class, (t2) => {
      const e2 = Object.create(Class.prototype);
      return un(e2, t2), dbg(e2, t2, f2), e2;
    }, getSpecificSlots];
  }
  function rejectInvalidBag(t2) {
    if (cn(t2) || void 0 !== t2.calendar || void 0 !== t2.timeZone) {
      throw new TypeError(i);
    }
    return t2;
  }
  function dbg(t2, e2, n2) {
    "dbg" === dbg.name && Object.defineProperty(t2, "o", {
      value: n2(e2),
      writable: 0,
      enumerable: 0,
      configurable: 0
    });
  }
  function getCalendarIdFromBag(t2) {
    return extractCalendarIdFromBag(t2) || l;
  }
  function extractCalendarIdFromBag(t2) {
    const { calendar: e2 } = t2;
    if (void 0 !== e2) {
      return refineCalendarArg(e2);
    }
  }
  function refineCalendarArg(t2) {
    if (s(t2)) {
      const { calendar: e2 } = cn(t2) || {};
      if (!e2) {
        throw new TypeError(c(t2));
      }
      return e2;
    }
    return ((t3) => u3(f(d(t3))))(t2);
  }
  function createCalendarGetters(t2) {
    const e2 = {};
    for (const n2 in t2) {
      e2[n2] = (t3) => {
        const { calendar: e3 } = t3;
        return v2(e3)[n2](t3);
      };
    }
    return e2;
  }
  function neverValueOf() {
    throw new TypeError(C2);
  }
  function refineTimeZoneArg(t2) {
    if (s(t2)) {
      const { timeZone: e2 } = cn(t2) || {};
      if (!e2) {
        throw new TypeError(F2(t2));
      }
      return e2;
    }
    return ((t3) => Z(M2(d(t3))))(t2);
  }
  function toDurationSlots(t2) {
    if (s(t2)) {
      const e2 = cn(t2);
      return e2 && e2.branding === A ? e2 : q2(t2);
    }
    return R(t2);
  }
  function refinePublicRelativeTo(t2) {
    if (void 0 !== t2) {
      if (s(t2)) {
        const e2 = cn(t2) || {};
        switch (e2.branding) {
          case _2:
          case G2:
            return e2;
          case x2:
            return W2(e2);
        }
        const n2 = getCalendarIdFromBag(t2);
        return {
          ...z2(refineTimeZoneArg, L2, v2(n2), t2),
          calendar: n2
        };
      }
      return $2(t2);
    }
  }
  function toPlainTimeSlots(t2, e2) {
    if (s(t2)) {
      const n3 = cn(t2) || {};
      switch (n3.branding) {
        case ft:
          return dt(e2), n3;
        case x2:
          return dt(e2), St(n3);
        case _2:
          return dt(e2), mt(L2, n3);
      }
      return Tt(t2, e2);
    }
    const n2 = ht(t2);
    return dt(e2), n2;
  }
  function optionalToPlainTimeFields(t2) {
    return void 0 === t2 ? void 0 : toPlainTimeSlots(t2);
  }
  function toPlainDateTimeSlots(t2, e2) {
    if (s(t2)) {
      const n3 = cn(t2) || {};
      switch (n3.branding) {
        case x2:
          return dt(e2), n3;
        case G2:
          return dt(e2), jt2({
            ...n3,
            ...At
          });
        case _2:
          return dt(e2), yt(L2, n3);
      }
      return Nt(v2(getCalendarIdFromBag(t2)), t2, e2);
    }
    const n2 = Bt(t2);
    return dt(e2), n2;
  }
  function toPlainMonthDaySlots(t2, e2) {
    if (s(t2)) {
      const n3 = cn(t2);
      if (n3 && n3.branding === qt) {
        return dt(e2), n3;
      }
      const o2 = extractCalendarIdFromBag(t2);
      return Rt(v2(o2 || l), !o2, t2, e2);
    }
    const n2 = xt(v2, t2);
    return dt(e2), n2;
  }
  function toPlainYearMonthSlots(t2, e2) {
    if (s(t2)) {
      const n3 = cn(t2);
      return n3 && n3.branding === Qt ? (dt(e2), n3) : Ut2(v2(getCalendarIdFromBag(t2)), t2, e2);
    }
    const n2 = Xt(v2, t2);
    return dt(e2), n2;
  }
  function toPlainDateSlots(t2, e2) {
    if (s(t2)) {
      const n3 = cn(t2) || {};
      switch (n3.branding) {
        case G2:
          return dt(e2), n3;
        case x2:
          return dt(e2), W2(n3);
        case _2:
          return dt(e2), fe2(L2, n3);
      }
      return de2(v2(getCalendarIdFromBag(t2)), t2, e2);
    }
    const n2 = me2(t2);
    return dt(e2), n2;
  }
  function toZonedDateTimeSlots(t2, e2) {
    if (s(t2)) {
      const n2 = cn(t2);
      if (n2 && n2.branding === _2) {
        return je2(e2), n2;
      }
      const o2 = getCalendarIdFromBag(t2);
      return Ae2(refineTimeZoneArg, L2, v2(o2), o2, t2, e2);
    }
    return Ne2(t2, e2);
  }
  function adaptDateMethods(t2) {
    return e(((t3) => (e2) => t3(slotsToIso(e2))), t2);
  }
  function slotsToIso(t2) {
    return he2(t2, L2);
  }
  function toInstantSlots(t2) {
    if (s(t2)) {
      const e2 = cn(t2);
      if (e2) {
        switch (e2.branding) {
          case Re2:
            return e2;
          case _2:
            return xe(e2.epochNanoseconds);
        }
      }
    }
    return We2(t2);
  }
  function createDateTimeFormatClass() {
    function DateTimeFormatFunc(t3, e3) {
      return new DateTimeFormatNew(t3, e3);
    }
    function DateTimeFormatNew(t3, e3 = /* @__PURE__ */ Object.create(null)) {
      to.set(this, ((t4, e4) => {
        const n3 = new en(t4, e4), o2 = n3.resolvedOptions(), r2 = o2.locale, a2 = nn(Object.keys(e4), o2), i2 = on(createFormatPrepperForBranding), prepFormat = (t5, ...e5) => {
          if (t5) {
            if (2 !== e5.length) {
              throw new TypeError(ln);
            }
            for (const t6 of e5) {
              if (void 0 === t6) {
                throw new TypeError(ln);
              }
            }
          }
          t5 || void 0 !== e5[0] || (e5 = []);
          const o3 = e5.map(((t6) => cn(t6) || Number(t6)));
          let l2, s2 = 0;
          for (const t6 of o3) {
            const e6 = "object" == typeof t6 ? t6.branding : void 0;
            if (s2++ && e6 !== l2) {
              throw new TypeError(ln);
            }
            l2 = e6;
          }
          return l2 ? i2(l2)(r2, a2, ...o3) : [n3, ...o3];
        };
        return prepFormat.i = n3, prepFormat;
      })(t3, e3));
    }
    const t2 = en.prototype, e2 = Object.getOwnPropertyDescriptors(t2), n2 = Object.getOwnPropertyDescriptors(en);
    for (const t3 in e2) {
      const n3 = e2[t3], o2 = t3.startsWith("format") && createFormatMethod(t3);
      "function" == typeof n3.value ? n3.value = "constructor" === t3 ? DateTimeFormatFunc : o2 || createProxiedMethod(t3) : o2 && (n3.get = function() {
        if (!to.has(this)) {
          throw new TypeError(a);
        }
        return (...t4) => o2.apply(this, t4);
      }, Object.defineProperties(n3.get, r(`get ${t3}`)));
    }
    return n2.prototype.value = DateTimeFormatNew.prototype = Object.create({}, e2), Object.defineProperties(DateTimeFormatFunc, n2), DateTimeFormatFunc;
  }
  function createFormatMethod(t2) {
    return Object.defineProperties((function(...e2) {
      const n2 = to.get(this), [o2, ...r2] = n2(t2.includes("Range"), ...e2);
      return o2[t2](...r2);
    }), r(t2));
  }
  function createProxiedMethod(t2) {
    return Object.defineProperties((function(...e2) {
      return to.get(this).i[t2](...e2);
    }), r(t2));
  }
  function createFormatPrepperForBranding(t2) {
    const e2 = vn[t2];
    if (!e2) {
      throw new TypeError(rn(t2));
    }
    return K2(e2, on(an), 1);
  }
  var sn = /* @__PURE__ */ new WeakMap();
  var cn = /* @__PURE__ */ sn.get.bind(sn);
  var un = /* @__PURE__ */ sn.set.bind(sn);
  var fn = {
    era: m2,
    eraYear: S,
    year: T2,
    month: h,
    daysInMonth: h,
    daysInYear: h,
    inLeapYear: D2,
    monthsInYear: h
  };
  var dn = {
    monthCode: d
  };
  var mn = {
    day: h
  };
  var Sn = {
    dayOfWeek: h,
    dayOfYear: h,
    weekOfYear: g2,
    yearOfWeek: S,
    daysInWeek: h
  };
  var Tn = /* @__PURE__ */ createCalendarGetters(/* @__PURE__ */ Object.assign({}, fn, dn, mn, Sn));
  var hn = /* @__PURE__ */ createCalendarGetters({
    ...fn,
    ...dn
  });
  var Dn = /* @__PURE__ */ createCalendarGetters({
    ...dn,
    ...mn
  });
  var gn = {
    calendarId: (t2) => t2.calendar
  };
  var Pn = /* @__PURE__ */ P2(((t2) => (e2) => e2[t2]), O2.concat("sign"));
  var On = /* @__PURE__ */ P2(((t2, e2) => (t3) => t3[w2[e2]]), p);
  var pn = {
    epochMilliseconds: I2,
    epochNanoseconds: b2
  };
  var [wn, In, bn] = createSlotClass(A, j2, {
    ...Pn,
    blank: y2
  }, {
    with: (t2, e2) => In(N2(t2, e2)),
    negated: (t2) => In(B2(t2)),
    abs: (t2) => In(Y2(t2)),
    add: (t2, e2, n2) => In(E2(refinePublicRelativeTo, v2, L2, 0, t2, toDurationSlots(e2), n2)),
    subtract: (t2, e2, n2) => In(E2(refinePublicRelativeTo, v2, L2, 1, t2, toDurationSlots(e2), n2)),
    round: (t2, e2) => In(V2(refinePublicRelativeTo, v2, L2, t2, e2)),
    total: (t2, e2) => J2(refinePublicRelativeTo, v2, L2, t2, e2),
    toLocaleString(t2, e2, n2) {
      return Intl.DurationFormat ? new Intl.DurationFormat(e2, n2).format(this) : k2(t2);
    },
    toString: k2,
    toJSON: (t2) => k2(t2),
    valueOf: neverValueOf
  }, {
    from: (t2) => In(toDurationSlots(t2)),
    compare: (t2, e2, n2) => H2(refinePublicRelativeTo, v2, L2, toDurationSlots(t2), toDurationSlots(e2), n2)
  }, k2);
  var vn = {
    Instant: Q2,
    PlainDateTime: U2,
    PlainDate: X2,
    PlainTime: tt2,
    PlainYearMonth: et2,
    PlainMonthDay: nt2
  };
  var Cn = /* @__PURE__ */ K2(Q2);
  var Fn = /* @__PURE__ */ K2(ot);
  var Zn = /* @__PURE__ */ K2(U2);
  var Mn = /* @__PURE__ */ K2(X2);
  var yn = /* @__PURE__ */ K2(tt2);
  var jn = /* @__PURE__ */ K2(et2);
  var An = /* @__PURE__ */ K2(nt2);
  var [Nn, Bn] = createSlotClass(ft, ut, On, {
    with(t2, e2, n2) {
      return Bn(rt2(this, rejectInvalidBag(e2), n2));
    },
    add: (t2, e2) => Bn(at(0, t2, toDurationSlots(e2))),
    subtract: (t2, e2) => Bn(at(1, t2, toDurationSlots(e2))),
    until: (t2, e2, n2) => In(it(0, t2, toPlainTimeSlots(e2), n2)),
    since: (t2, e2, n2) => In(it(1, t2, toPlainTimeSlots(e2), n2)),
    round: (t2, e2) => Bn(lt(t2, e2)),
    equals: (t2, e2) => st(t2, toPlainTimeSlots(e2)),
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = yn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: ct,
    toJSON: (t2) => ct(t2),
    valueOf: neverValueOf
  }, {
    from: (t2, e2) => Bn(toPlainTimeSlots(t2, e2)),
    compare: (t2, e2) => Dt(toPlainTimeSlots(t2), toPlainTimeSlots(e2))
  }, ct);
  var [Yn, En] = createSlotClass(x2, gt(Mt, Zt), {
    ...gn,
    ...Tn,
    ...On
  }, {
    with: (t2, e2, n2) => En(Pt(v2, t2, rejectInvalidBag(e2), n2)),
    withCalendar: (t2, e2) => En(Ot(t2, refineCalendarArg(e2))),
    withPlainTime: (t2, e2) => En(pt(t2, optionalToPlainTimeFields(e2))),
    add: (t2, e2, n2) => En(wt(v2, 0, t2, toDurationSlots(e2), n2)),
    subtract: (t2, e2, n2) => En(wt(v2, 1, t2, toDurationSlots(e2), n2)),
    until: (t2, e2, n2) => In(It(v2, 0, t2, toPlainDateTimeSlots(e2), n2)),
    since: (t2, e2, n2) => In(It(v2, 1, t2, toPlainDateTimeSlots(e2), n2)),
    round: (t2, e2) => En(bt(t2, e2)),
    equals: (t2, e2) => vt(t2, toPlainDateTimeSlots(e2)),
    toZonedDateTime: (t2, e2, n2) => zn(Ct(L2, t2, refineTimeZoneArg(e2), n2)),
    toPlainDate: (t2) => Wn(W2(t2)),
    toPlainTime: (t2) => Bn(St(t2)),
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = Zn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: Ft2,
    toJSON: (t2) => Ft2(t2),
    valueOf: neverValueOf
  }, {
    from: (t2, e2) => En(toPlainDateTimeSlots(t2, e2)),
    compare: (t2, e2) => Yt(toPlainDateTimeSlots(t2), toPlainDateTimeSlots(e2))
  }, Ft2);
  var [Ln, Vn, Jn] = createSlotClass(qt, gt(kt, Zt), {
    ...gn,
    ...Dn
  }, {
    with: (t2, e2, n2) => Vn(Et(v2, t2, rejectInvalidBag(e2), n2)),
    equals: (t2, e2) => Lt(t2, toPlainMonthDaySlots(e2)),
    toPlainDate(t2, e2) {
      return Wn(Vt2(v2, t2, this, e2));
    },
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = An(e2, n2, t2);
      return o2.format(r2);
    },
    toString: Jt2,
    toJSON: (t2) => Jt2(t2),
    valueOf: neverValueOf
  }, {
    from: (t2, e2) => Vn(toPlainMonthDaySlots(t2, e2))
  }, Jt2);
  var [kn, qn, Rn] = createSlotClass(Qt, gt(Kt2, Zt), {
    ...gn,
    ...hn
  }, {
    with: (t2, e2, n2) => qn(Wt2(v2, t2, rejectInvalidBag(e2), n2)),
    add: (t2, e2, n2) => qn(Gt(v2, 0, t2, toDurationSlots(e2), n2)),
    subtract: (t2, e2, n2) => qn(Gt(v2, 1, t2, toDurationSlots(e2), n2)),
    until: (t2, e2, n2) => In(_t(v2, 0, t2, toPlainYearMonthSlots(e2), n2)),
    since: (t2, e2, n2) => In(_t(v2, 1, t2, toPlainYearMonthSlots(e2), n2)),
    equals: (t2, e2) => zt(t2, toPlainYearMonthSlots(e2)),
    toPlainDate(t2, e2) {
      return Wn($t(v2, t2, this, e2));
    },
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = jn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: Ht,
    toJSON: (t2) => Ht(t2),
    valueOf: neverValueOf
  }, {
    from: (t2, e2) => qn(toPlainYearMonthSlots(t2, e2)),
    compare: (t2, e2) => te(toPlainYearMonthSlots(t2), toPlainYearMonthSlots(e2))
  }, Ht);
  var [xn, Wn, Gn] = createSlotClass(G2, gt(ue2, Zt), {
    ...gn,
    ...Tn
  }, {
    with: (t2, e2, n2) => Wn(ee(v2, t2, rejectInvalidBag(e2), n2)),
    withCalendar: (t2, e2) => Wn(Ot(t2, refineCalendarArg(e2))),
    add: (t2, e2, n2) => Wn(ne(v2, 0, t2, toDurationSlots(e2), n2)),
    subtract: (t2, e2, n2) => Wn(ne(v2, 1, t2, toDurationSlots(e2), n2)),
    until: (t2, e2, n2) => In(oe2(v2, 0, t2, toPlainDateSlots(e2), n2)),
    since: (t2, e2, n2) => In(oe2(v2, 1, t2, toPlainDateSlots(e2), n2)),
    equals: (t2, e2) => re2(t2, toPlainDateSlots(e2)),
    toZonedDateTime(t2, e2) {
      const n2 = s(e2) ? e2 : {
        timeZone: e2
      };
      return zn(ae2(refineTimeZoneArg, toPlainTimeSlots, L2, t2, n2));
    },
    toPlainDateTime: (t2, e2) => En(ie2(t2, optionalToPlainTimeFields(e2))),
    toPlainYearMonth(t2) {
      return qn(le2(v2, t2, this));
    },
    toPlainMonthDay(t2) {
      return Vn(se2(v2, t2, this));
    },
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = Mn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: ce2,
    toJSON: (t2) => ce2(t2),
    valueOf: neverValueOf
  }, {
    from: (t2, e2) => Wn(toPlainDateSlots(t2, e2)),
    compare: (t2, e2) => te(toPlainDateSlots(t2), toPlainDateSlots(e2))
  }, ce2);
  var [_n, zn] = createSlotClass(_2, gt(ye2, Zt, Me2), {
    ...pn,
    ...gn,
    ...adaptDateMethods(Tn),
    ...adaptDateMethods(On),
    offset: (t2) => Se2(slotsToIso(t2).offsetNanoseconds),
    offsetNanoseconds: (t2) => slotsToIso(t2).offsetNanoseconds,
    timeZoneId: (t2) => t2.timeZone,
    hoursInDay: (t2) => Te2(L2, t2)
  }, {
    with: (t2, e2, n2) => zn(De2(v2, L2, t2, rejectInvalidBag(e2), n2)),
    withCalendar: (t2, e2) => zn(Ot(t2, refineCalendarArg(e2))),
    withTimeZone: (t2, e2) => zn(ge2(t2, refineTimeZoneArg(e2))),
    withPlainTime: (t2, e2) => zn(Pe2(L2, t2, optionalToPlainTimeFields(e2))),
    add: (t2, e2, n2) => zn(Oe2(v2, L2, 0, t2, toDurationSlots(e2), n2)),
    subtract: (t2, e2, n2) => zn(Oe2(v2, L2, 1, t2, toDurationSlots(e2), n2)),
    until: (t2, e2, n2) => In(pe2(we2(v2, L2, 0, t2, toZonedDateTimeSlots(e2), n2))),
    since: (t2, e2, n2) => In(pe2(we2(v2, L2, 1, t2, toZonedDateTimeSlots(e2), n2))),
    round: (t2, e2) => zn(Ie2(L2, t2, e2)),
    startOfDay: (t2) => zn(be(L2, t2)),
    equals: (t2, e2) => ve2(t2, toZonedDateTimeSlots(e2)),
    toInstant: (t2) => Hn(Ce2(t2)),
    toPlainDateTime: (t2) => En(yt(L2, t2)),
    toPlainDate: (t2) => Wn(fe2(L2, t2)),
    toPlainTime: (t2) => Bn(mt(L2, t2)),
    toLocaleString(t2, e2, n2 = {}) {
      const [o2, r2] = Fn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: (t2, e2) => Fe2(L2, t2, e2),
    toJSON: (t2) => Fe2(L2, t2),
    valueOf: neverValueOf,
    getTimeZoneTransition(t2, e2) {
      const { timeZone: n2, epochNanoseconds: o2 } = t2, r2 = Ze2(e2), a2 = L2(n2).l(o2, r2);
      return a2 ? zn({
        ...t2,
        epochNanoseconds: a2
      }) : null;
    }
  }, {
    from: (t2, e2) => zn(toZonedDateTimeSlots(t2, e2)),
    compare: (t2, e2) => Be2(toZonedDateTimeSlots(t2), toZonedDateTimeSlots(e2))
  }, ((t2) => Fe2(L2, t2)));
  var [$n, Hn, Kn] = createSlotClass(Re2, qe2, pn, {
    add: (t2, e2) => Hn(Ye2(0, t2, toDurationSlots(e2))),
    subtract: (t2, e2) => Hn(Ye2(1, t2, toDurationSlots(e2))),
    until: (t2, e2, n2) => In(Ee2(0, t2, toInstantSlots(e2), n2)),
    since: (t2, e2, n2) => In(Ee2(1, t2, toInstantSlots(e2), n2)),
    round: (t2, e2) => Hn(Le2(t2, e2)),
    equals: (t2, e2) => Ve2(t2, toInstantSlots(e2)),
    toZonedDateTimeISO: (t2, e2) => zn(Je2(t2, refineTimeZoneArg(e2))),
    toLocaleString(t2, e2, n2) {
      const [o2, r2] = Cn(e2, n2, t2);
      return o2.format(r2);
    },
    toString: (t2, e2) => ke2(refineTimeZoneArg, L2, t2, e2),
    toJSON: (t2) => ke2(refineTimeZoneArg, L2, t2),
    valueOf: neverValueOf
  }, {
    from: (t2) => Hn(toInstantSlots(t2)),
    fromEpochMilliseconds: (t2) => Hn(ze2(t2)),
    fromEpochNanoseconds: (t2) => Hn($e2(t2)),
    compare: (t2, e2) => He2(toInstantSlots(t2), toInstantSlots(e2))
  }, ((t2) => ke2(refineTimeZoneArg, L2, t2)));
  var Qn = /* @__PURE__ */ Object.defineProperties({}, {
    ...o("Temporal.Now"),
    ...n({
      timeZoneId: () => Qe2(),
      instant: () => Hn(xe(Ue2())),
      zonedDateTimeISO: (t2 = Qe2()) => zn(Xe2(Ue2(), refineTimeZoneArg(t2), l)),
      plainDateTimeISO: (t2 = Qe2()) => En(jt2(tn(L2(refineTimeZoneArg(t2))), l)),
      plainDateISO: (t2 = Qe2()) => Wn(W2(tn(L2(refineTimeZoneArg(t2))), l)),
      plainTimeISO: (t2 = Qe2()) => Bn(St(tn(L2(refineTimeZoneArg(t2)))))
    })
  });
  var Un = /* @__PURE__ */ Object.defineProperties({}, {
    ...o("Temporal"),
    ...n({
      PlainYearMonth: kn,
      PlainMonthDay: Ln,
      PlainDate: xn,
      PlainTime: Nn,
      PlainDateTime: Yn,
      ZonedDateTime: _n,
      Instant: $n,
      Duration: wn,
      Now: Qn
    })
  });
  var Xn = /* @__PURE__ */ createDateTimeFormatClass();
  var to = /* @__PURE__ */ new WeakMap();
  var eo = /* @__PURE__ */ Object.defineProperties(Object.create(Intl), n({
    DateTimeFormat: Xn
  }));

  // src/scripts/index.ts
  var STATIC_DATA = {
    changelog: {
      version: {
        string: "1.3.0"
      },
      updates: [
        `The Roottrees Are Dead will be permanently removed on May 10th, 2026.
See the warning next to the game link for info.`,
        `Renamed all .wic files back to .swf files.`
      ].map((str) => `${g(str.replace(/\n/g, "<br>"))}`).join("")
    }
  };
  {
    const els = document.querySelectorAll(`[data-no-navigate]`);
    els.forEach((el2) => {
      el2.addEventListener("click", (e2) => e2.preventDefault());
      el2.href = "javascript:void(0)";
      el2.role = "button";
    });
  }
  var showChangelog = () => {
    const modal = document.querySelector("#changelog");
    const header = modal.querySelector("h1");
    modal.showModal();
    modal.addEventListener("close", () => {
      localStorage.setItem(
        "changelogVersion",
        STATIC_DATA.changelog.version.string
      );
    });
    header.textContent = `Updates - v${STATIC_DATA.changelog.version.string}`;
    header.after(
      Object.assign(document.createElement("div"), {
        innerHTML: STATIC_DATA.changelog.updates
      })
    );
  };
  {
    const version = localStorage.getItem("changelogVersion") || STATIC_DATA.changelog.version.string;
    if (import_semver.default.lt(version, STATIC_DATA.changelog.version.string)) {
      showChangelog();
    }
  }
  {
    const modal = document.querySelector(
      "#adobe-flash-warning"
    );
    if (navigator.plugins.namedItem("Shockwave Flash") instanceof Plugin && localStorage.getItem("adobe-flash-nowarn") !== "true") {
      modal.showModal();
    }
    const btn = modal.querySelector(
      ".adobe-flash-warning-nowarn"
    );
    btn.addEventListener("click", () => {
      modal.close();
      localStorage.setItem("adobe-flash-nowarn", "true");
    });
    {
      const span = document.querySelector(
        ".adobe-flash-warning-discontinuation-date"
      );
      const death = Un.PlainDateTime.from({
        year: 2020,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59
      });
      const handler = () => {
        const time = Un.Now.plainDateTimeISO();
        const elapsed = time.since(death, { largestUnit: "year" });
        span.textContent = `
${elapsed.years} years,
${elapsed.months} months,
${elapsed.days} days,
${elapsed.hours} hours,
${elapsed.minutes} minutes,
and
${elapsed.seconds} seconds
`;
      };
      handler();
      setInterval(handler, 1e3);
    }
  }
  {
    const link = document.querySelector(
      "a[href*='roottrees/Roottrees_WebGL_MinorPatch/']"
    );
    {
      const target = Un.PlainDateTime.from({
        year: 2026,
        month: 5,
        day: 17,
        hour: 20
      });
      const current = Un.Now.plainDateTimeISO();
      if (Un.PlainDateTime.compare(current, target) >= 0) {
        link.style.display = "none";
        document.querySelector(
          ".roottrees-removal-real-removal"
        ).showModal();
      } else {
        const target2 = Un.PlainDate.from({
          year: 2026,
          month: 5,
          day: 10
        });
        const current2 = Un.Now.plainDateISO();
        if (Un.PlainDateTime.compare(current2, target2) >= 0) {
          link.style.display = "none";
          document.querySelector(
            ".roottrees-removal-final-migration"
          ).showModal();
        } else {
          const target3 = Un.PlainDate.from({
            year: 2026,
            month: 5,
            day: 5
          });
          const current3 = Un.Now.plainDateISO();
          if (Un.PlainDateTime.compare(current3, target3) >= 0 && localStorage.getItem("__MIGRATED_ROOTTREES") !== "true") {
            document.querySelector(
              ".roottrees-removal-force"
            ).showModal();
            for (const link2 of document.querySelector("ul#special").querySelectorAll(
              "a:not([href*='therealdeal/roottrees']):not(.roottrees-removal-btn)"
            )) {
              link2.style.textDecoration = "line-through";
              link2.removeAttribute("href");
            }
          } else {
            const target4 = Un.PlainDate.from({
              year: 2026,
              month: 4,
              day: 29
            });
            const current4 = Un.Now.plainDateISO();
            if (Un.PlainDateTime.compare(current4, target4) >= 0 && localStorage.getItem("__MIGRATED_ROOTTREES") !== "true") {
              document.querySelector(
                ".roottrees-removal-reminder"
              ).showModal();
            }
          }
        }
      }
    }
  }
  {
    const btn = document.querySelector(
      ".roottrees-removal-btn"
    );
    const modal = document.querySelector(
      ".roottrees-removal-warning"
    );
    btn.addEventListener("click", () => modal.showModal());
  }
})();
