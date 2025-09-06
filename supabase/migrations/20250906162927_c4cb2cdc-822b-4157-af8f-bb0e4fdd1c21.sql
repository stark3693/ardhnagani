-- Create love messages table for anniversary replies
CREATE TABLE public.love_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  sender_name TEXT DEFAULT 'My Love',
  mood TEXT DEFAULT 'happy',
  photo_url TEXT,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (for now allow all access since it's personal)
ALTER TABLE public.love_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read and write (since it's a personal anniversary site)
CREATE POLICY "Anyone can view love messages" 
ON public.love_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create love messages" 
ON public.love_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update love messages" 
ON public.love_messages 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_love_messages_updated_at
BEFORE UPDATE ON public.love_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();