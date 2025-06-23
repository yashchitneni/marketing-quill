-- Create custom templates table
CREATE TABLE IF NOT EXISTS custom_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  template TEXT NOT NULL,
  placeholders JSONB DEFAULT '[]'::jsonb,
  is_public BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create template usage analytics table
CREATE TABLE IF NOT EXISTS template_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id TEXT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_custom_templates_user_id ON custom_templates(user_id);
CREATE INDEX idx_custom_templates_category ON custom_templates(category);
CREATE INDEX idx_custom_templates_is_public ON custom_templates(is_public);
CREATE INDEX idx_template_usage_user_id ON template_usage(user_id);
CREATE INDEX idx_template_usage_template_id ON template_usage(template_id);
CREATE INDEX idx_template_usage_used_at ON template_usage(used_at);

-- Enable RLS
ALTER TABLE custom_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_usage ENABLE ROW LEVEL SECURITY;

-- Policies for custom_templates
CREATE POLICY "Users can view their own templates"
  ON custom_templates
  FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own templates"
  ON custom_templates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON custom_templates
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON custom_templates
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for template_usage
CREATE POLICY "Users can view their own usage"
  ON template_usage
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track their own usage"
  ON template_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for custom_templates
CREATE TRIGGER update_custom_templates_updated_at
  BEFORE UPDATE ON custom_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();