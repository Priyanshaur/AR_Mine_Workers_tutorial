// SafetyLens AR - Certificate Generator & Signature Module (with Path String Tracking)

const CertificateModule = {
  currentPayload: null,

  init: function(workerInputElem, containerId, scoreVal, moduleKey, pathStr) {
    const self = this;
    const defaultName = "Ramesh Kumar";
    const userPath = pathStr || window.sessionPathString || "Correct on first attempt";
    const userScore = scoreVal || window.sessionScore || 96;

    if (workerInputElem) {
      workerInputElem.value = defaultName;
      workerInputElem.addEventListener('input', function() {
        self.updateCertificate(this.value, containerId, userScore, moduleKey, userPath);
      });
    }
    this.updateCertificate(defaultName, containerId, userScore, moduleKey, userPath);
  },

  updateCertificate: function(name, containerId, scoreVal, moduleKey, pathStr) {
    const workerName = name.trim() || "Ramesh Kumar";
    const dateStr = new Date().toISOString().split('T')[0];
    const score = scoreVal || 96;
    const modId = moduleKey || "mod1";
    const pathText = pathStr || "Correct on first attempt";

    const sig = QRVerifier.computeSig(workerName, modId, score, dateStr);

    this.currentPayload = {
      worker: workerName,
      module: modId,
      score: score,
      path: pathText,
      timestamp: dateStr,
      sig: sig
    };
    window.currentCertificatePayload = this.currentPayload;

    // Update DOM fields
    const nameDisplays = document.querySelectorAll('.cert-worker-name-val');
    nameDisplays.forEach(el => el.textContent = workerName);

    const scoreDisplay = document.getElementById('cert-score-val');
    if (scoreDisplay) scoreDisplay.textContent = score;

    const dateDisplay = document.getElementById('cert-date-val');
    if (dateDisplay) dateDisplay.textContent = dateStr;

    const pathDisplay = document.getElementById('cert-path-val');
    if (pathDisplay) pathDisplay.textContent = pathText;

    const sigDisplay = document.getElementById('cert-sig-val');
    if (sigDisplay) {
      sigDisplay.textContent = `signed payload · {"worker":"${workerName}","module":"${modId}","score":${score},"path":"${pathText}"} · ${sig}`;
    }

    // Render QR matrix inside container
    const qrText = JSON.stringify(this.currentPayload);
    QRCodeGen.render(containerId, qrText);
  }
};
