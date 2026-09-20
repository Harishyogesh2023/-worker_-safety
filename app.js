const maxManagers = 3;
const maxWorkers = 5;

let currentManagers = 0;
let currentWorkers = 0;

const users = [];
const voiceCommands = [];
const safetyCheckNotifications = [];
const auditTrail = [];
const safetyProtocols = [
  "Mandatory PPE inspection before every shift",
  "Report unsafe conditions within 5 minutes",
  "Emergency exits must remain clear and visible",
  "All powered tools must be grounded and checked"
];

let currentUser = null;
const taskVerificationStatus = {
  helmet: false,
  gloves: false,
  shoes: false
};

async function sendNotification(workerName, report) {
  const worker = users.find((user) => user.name === workerName && user.role === "worker");
  if (!worker) return;

  try {
    const response = await fetch("/report-hazard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workerName,
        report,
        email: worker.email,
        phone: worker.phone
      })
    });

    if (response.ok) {
      console.log("Notification sent successfully.");
    } else {
      console.error("Failed to send notification.");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

function renderLoginPage() {
  document.getElementById("app").innerHTML = `
    <div class="container-shell">
      <div class="auth-card">
        <div class="auth-header">
          <h3>SiteSafe AI</h3>
        </div>
        <div class="auth-body">
          <form id="loginForm">
            <div class="mb-3">
              <label class="form-label" for="username">Username</label>
              <input type="text" class="form-control" id="username" placeholder="Enter your email" required />
            </div>

            <div class="mb-3">
              <label class="form-label" for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password" required />
            </div>

            <div class="mb-3">
              <label class="form-label" for="role">Role</label>
              <select class="form-select" id="role" required>
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Login</button>
              <button type="button" class="btn btn-secondary" onclick="renderSignupPage()">Create account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = users.find((entry) => entry.email === username && entry.password === password && entry.role === role);

    if (user) {
      currentUser = user;

      if (role === "manager") {
        if (currentManagers < maxManagers) {
          currentManagers += 1;
          alert("Login successful. Welcome, Manager.");
          renderManagerPage();
        } else {
          alert("Maximum managers currently active. Please try again later.");
        }
      } else if (role === "worker") {
        if (currentWorkers < maxWorkers) {
          currentWorkers += 1;
          alert("Login successful. Welcome, Worker.");
          renderWorkerPage(user.name);
        } else {
          alert("Maximum workers currently active. Please try again later.");
        }
      }
    } else {
      alert("Invalid username, password, or role.");
    }
  });
}

function renderSignupPage() {
  document.getElementById("app").innerHTML = `
    <div class="container-shell">
      <div class="auth-card">
        <div class="auth-header">
          <h3>Create Account</h3>
        </div>
        <div class="auth-body">
          <form id="signUpForm">
            <div class="mb-3">
              <label class="form-label" for="name">Full name</label>
              <input type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="email">Email</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="password">Password</label>
              <input type="password" class="form-control" id="password" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="phone">Phone number</label>
              <input type="text" class="form-control" id="phone" required />
            </div>
            <div class="mb-3">
              <label class="form-label" for="signupRole">Role</label>
              <select class="form-select" id="signupRole" required>
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById("signUpForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("signupRole").value;

    users.push({ name, email, password, phone, role });
    alert(`Sign up successful. Welcome ${name}.`);
    renderLoginPage();
  });
}

function renderManagerPage() {
  document.getElementById("app").innerHTML = `
    <div class="container-shell">
      <div class="dashboard-card">
        <div class="dashboard-header">
          <h3>Manager Dashboard</h3>
          <button class="btn btn-danger" onclick="renderLoginPage()">Logout</button>
        </div>

        <div class="dashboard-body">
          <p>Monitor site safety, review worker reports, and enforce compliance across active zones.</p>

          <div class="summary-grid">
            <div class="metric-card">
              <h5>Active workers</h5>
              <strong>${currentWorkers}</strong>
            </div>
            <div class="metric-card">
              <h5>Active managers</h5>
              <strong>${currentManagers}</strong>
            </div>
            <div class="metric-card">
              <h5>Safety checks</h5>
              <strong>${safetyCheckNotifications.length}</strong>
            </div>
          </div>

          <div class="mb-4">
            <span class="section-heading">Live hazard alerts</span>
            <ul class="list-group">
              ${voiceCommands.length
                ? voiceCommands.map((item) => `<li class="list-group-item"><span class="badge-status badge-warning">Open</span> ${item}</li>`).join("")
                : `<li class="list-group-item">No active alerts.</li>`}
            </ul>
          </div>

          <div class="mb-4">
            <span class="section-heading">Inspection results</span>
            <ul class="list-group">
              ${safetyCheckNotifications.length
                ? safetyCheckNotifications.map((item) => `<li class="list-group-item"><span class="badge-status badge-success">Verified</span> ${item}</li>`).join("")
                : `<li class="list-group-item">No safety checks completed yet.</li>`}
            </ul>
          </div>

          <div class="mb-4">
            <span class="section-heading">Audit trail</span>
            <ul class="list-group">
              ${auditTrail.length
                ? auditTrail.map((log) => `<li class="list-group-item">${log.time} • ${log.user} • ${log.action} • ${log.details}</li>`).join("")
                : `<li class="list-group-item">No audit records yet.</li>`}
            </ul>
          </div>

          <div class="mb-4">
            <span class="section-heading">Add audit action</span>
            <div class="input-stack">
              <input type="text" id="auditAction" class="form-control" placeholder="Action" />
              <input type="text" id="auditDetails" class="form-control" placeholder="Details" />
              <button class="btn btn-primary" onclick="addAuditTrail()">Add record</button>
            </div>
          </div>

          <div class="mb-4">
            <span class="section-heading">Safety protocol library</span>
            <ul class="list-group">
              ${safetyProtocols.map((protocol, index) => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span>${protocol}</span>
                  <button class="btn btn-danger btn-sm" onclick="removeSafetyProtocol(${index})">Delete</button>
                </li>
              `).join("")}
            </ul>
            <div class="spacer-sm"></div>
            <div class="input-stack">
              <input type="text" id="newSafetyProtocol" class="form-control" placeholder="New safety protocol" />
              <button class="btn btn-primary" onclick="addSafetyProtocol()">Add protocol</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function addAuditTrail() {
  const action = document.getElementById("auditAction").value.trim();
  const details = document.getElementById("auditDetails").value.trim();

  if (!action || !details) {
    alert("Please enter both the action and details.");
    return;
  }

  auditTrail.push({
    time: new Date().toLocaleString(),
    user: currentUser ? currentUser.name : "Admin",
    action,
    details
  });

  document.getElementById("auditAction").value = "";
  document.getElementById("auditDetails").value = "";
  renderManagerPage();
}

function addSafetyProtocol() {
  const newProtocol = document.getElementById("newSafetyProtocol").value.trim();
  if (!newProtocol) {
    alert("Please enter a safety protocol first.");
    return;
  }

  safetyProtocols.push(newProtocol);
  document.getElementById("newSafetyProtocol").value = "";
  renderManagerPage();
}

function removeSafetyProtocol(index) {
  if (!confirm("Delete this safety protocol?")) return;
  safetyProtocols.splice(index, 1);
  renderManagerPage();
}

function renderWorkerPage(workerName) {
  document.getElementById("app").innerHTML = `
    <div class="container-shell">
      <div class="dashboard-card">
        <div class="dashboard-header">
          <h3>Worker Dashboard</h3>
          <button class="btn btn-danger" onclick="renderLoginPage()">Logout</button>
        </div>

        <div class="dashboard-body">
          <p>Welcome, <strong>${workerName}</strong>. Complete PPE verification and report hazards in real time.</p>

          <div class="mb-4">
            <span class="section-heading">Safety tasks</span>
            <ul class="list-group">
              <li class="list-group-item task-item">
                Wear helmet
                <input type="file" class="form-control" accept="image/*" onchange="analyzeTaskImage(event, 'helmet')" />
              </li>
              <li class="list-group-item task-item">
                Wear gloves
                <input type="file" class="form-control" accept="image/*" onchange="analyzeTaskImage(event, 'gloves')" />
              </li>
              <li class="list-group-item task-item">
                Wear shoes
                <input type="file" class="form-control" accept="image/*" onchange="analyzeTaskImage(event, 'shoes')" />
              </li>
            </ul>
          </div>

          <div class="mb-4">
            <button class="btn btn-warning" onclick="startVoiceCommand('${workerName}')">Voice hazard report</button>
            <div class="spacer-sm"></div>
            <div class="input-stack">
              <input type="text" id="textCommand" class="form-control" placeholder="Type your hazard report" />
              <button class="btn btn-primary" onclick="submitTextCommand('${workerName}')">Submit report</button>
            </div>
          </div>

          <div class="mb-4">
            <button class="btn btn-success" onclick="verifySafetyTasks()">Verify safety tasks</button>
            <div id="analysisResult" class="result-box">No image analyzed yet.</div>
          </div>

          <div class="mb-4">
            <span class="section-heading">Site safety guidelines</span>
            <ul class="list-group">
              <li class="list-group-item">Always wear a helmet, gloves, and protected footwear on site.</li>
              <li class="list-group-item">Inspect tools, ladders, and barriers before use.</li>
              <li class="list-group-item">Report unsafe conditions immediately and keep emergency exits clear.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function analyzeTaskImage(event, task) {
  const file = event.target.files[0];
  if (!file) {
    alert("Please upload an image before analyzing.");
    return;
  }

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(img);
    const analysisResult = document.getElementById("analysisResult");
    analysisResult.innerHTML = `<h5>Analysis result for ${task}</h5>`;

    let taskVerified = false;

    predictions.forEach((prediction) => {
      const confidence = Math.round(prediction.score * 100);
      const p = document.createElement("p");
      p.textContent = `${prediction.class}: ${confidence}% confidence`;
      analysisResult.appendChild(p);

      if (
        (task === "helmet" && prediction.class === "person" && confidence >= 70) ||
        (task === "gloves" && prediction.class === "person" && confidence >= 70) ||
        (task === "shoes" && prediction.class === "person" && confidence >= 70)
      ) {
        taskVerificationStatus[task] = true;
        taskVerified = true;
      }
    });

    if (taskVerified) {
      analysisResult.innerHTML += `<p class="text-success">${task} verified successfully.</p>`;
    } else {
      analysisResult.innerHTML += `<p class="text-danger">${task} could not be verified.</p>`;
    }
  };
}

function verifySafetyTasks() {
  const tasks = ["helmet", "gloves", "shoes"];
  const allTasksVerified = tasks.every((task) => taskVerificationStatus[task]);

  if (allTasksVerified) {
    safetyCheckNotifications.push("Safety check successfully completed by worker.");
    alert("All safety checks are verified.");
    renderManagerPage();
  } else {
    alert("Some tasks are still incomplete. Please verify each PPE item.");
  }
}

function startVoiceCommand(workerName) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    const report = `Hazard reported by ${workerName}: ${transcript}`;
    alert(report);
    voiceCommands.push(report);
    sendNotification(workerName, report);
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };

  recognition.onerror = function (event) {
    alert("Recognition error: " + event.error);
  };
}

function submitTextCommand(workerName) {
  const textCommand = document.getElementById("textCommand").value.trim();
  if (!textCommand) {
    alert("Please enter a hazard report.");
    return;
  }

  const report = `Hazard reported by ${workerName}: ${textCommand}`;
  alert(report);
  voiceCommands.push(report);
  sendNotification(workerName, report);
  document.getElementById("textCommand").value = "";
}

renderLoginPage();
