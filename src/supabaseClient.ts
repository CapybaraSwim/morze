import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vmocmmmcyllqscopeawv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtb2NtbW1jeWxscXNjb3BlYXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODY3MzIsImV4cCI6MjA2MTc2MjczMn0.GSUqCIZTRIwxglCfc3esYLGTZ1SgWt0GuhWEiSO6F4w';

export const supabase = createClient(supabaseUrl, supabaseKey);