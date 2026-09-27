const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

function escapeCsv(value) {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

async function exportLeads() {
  console.log("Fetching users from Supabase Auth...");
  let page = 1;
  let allUsers = [];

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000,
    });

    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    const users = data?.users || [];
    if (users.length === 0) break;

    allUsers = allUsers.concat(users);
    if (users.length < 1000) break;
    page++;
  }

  console.log(`Retrieved ${allUsers.length} total users.`);

  const headers = ["Email", "Full Name", "First Name", "Signed Up Date", "Last Sign In"];
  const rows = [headers.join(",")];

  let validEmailCount = 0;

  for (const user of allUsers) {
    if (!user.email) continue;
    validEmailCount++;

    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "";
    const firstName = fullName ? fullName.split(" ")[0] : "";
    const createdAt = user.created_at ? new Date(user.created_at).toISOString().split("T")[0] : "";
    const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at).toISOString().split("T")[0] : "";

    rows.push([
      escapeCsv(user.email),
      escapeCsv(fullName),
      escapeCsv(firstName),
      escapeCsv(createdAt),
      escapeCsv(lastSignIn),
    ].join(","));
  }

  const outputPath = path.resolve(__dirname, "../leads.csv");
  fs.writeFileSync(outputPath, rows.join("\r\n"), "utf8");

  console.log(`\n Successfully exported ${validEmailCount} leads to:\n${outputPath}`);
}

exportLeads();
