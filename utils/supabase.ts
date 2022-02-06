import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPERBASE_URL, process.env.SUPERBASE_KEY);

export default client;
