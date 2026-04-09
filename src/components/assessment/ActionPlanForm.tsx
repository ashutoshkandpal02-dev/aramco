'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Send, Calendar, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  onSubmit: (data: { commitments: string[], timeline: string }) => void;
}

export function ActionPlanForm({ onSubmit }: Props) {
  const [commitments, setCommitments] = useState<string[]>(['', '']);
  const [timeline, setTimeline] = useState('1 week');
  const [priority, setPriority] = useState('Medium');

  const addCommitment = () => setCommitments([...commitments, '']);
  const updateCommitment = (idx: number, val: string) => {
    const newCommits = [...commitments];
    newCommits[idx] = val;
    setCommitments(newCommits);
  };
  const removeCommitment = (idx: number) => {
    if (commitments.length > 1) {
      setCommitments(commitments.filter((_, i) => i !== idx));
    }
  };

  const isComplete = commitments.every(c => c.trim().length > 0);

  return (
    <Card className="glass-card overflow-hidden animate-slide-in">
      <CardHeader className="border-b bg-muted/10 p-8">
        <div className="flex items-center gap-2 text-primary font-bold mb-1">
          <Star className="w-4 h-4 fill-primary" />
          <span className="text-xs uppercase tracking-widest">Post-Assessment Workshop</span>
        </div>
        <CardTitle className="text-3xl font-black">Your Action Plan</CardTitle>
        <CardDescription className="text-base text-card-foreground">
          Define exactly how you will apply these new skills in your daily workflow. Specific actions lead to better results.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        <div className="space-y-6">
          {commitments.map((commit, idx) => (
            <div key={idx} className="space-y-2 group animate-fade-in">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  Commitment {idx + 1}
                </Label>
                {commitments.length > 1 && (
                  <button 
                    onClick={() => removeCommitment(idx)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Textarea 
                placeholder="e.g., I will conduct a bi-weekly standup with my team to improve alignment..."
                value={commit}
                onChange={(e) => updateCommitment(idx, e.target.value)}
                className="resize-none h-24 rounded-2xl border-muted bg-muted/20 focus:bg-white transition-all focus:ring-secondary/20"
              />
            </div>
          ))}
          <Button 
            variant="outline" 
            onClick={addCommitment} 
            className="w-full border-dashed border-2 py-8 rounded-2xl hover:bg-primary/5 hover:border-primary transition-all text-muted-foreground"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Another Commitment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <Label className="font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" /> Implementation Timeline
            </Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger className="rounded-xl h-12 bg-muted/20 border-muted">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 week">Next 7 Days</SelectItem>
                <SelectItem value="2 weeks">Next 14 Days</SelectItem>
                <SelectItem value="1 month">Next 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label className="font-bold">Plan Priority Level</Label>
            <div className="flex gap-2 p-1 bg-muted/20 rounded-xl border border-muted">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                    priority === p ? "bg-white text-secondary shadow-sm" : "text-muted-foreground hover:bg-white/50"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-8 border-t bg-muted/5">
        <Button 
          disabled={!isComplete} 
          className="w-full py-8 rounded-full text-lg font-bold gradient-bg shadow-2xl hover:scale-[1.01] transition-transform active:scale-95"
          onClick={() => onSubmit({ commitments, timeline })}
        >
          <Send className="mr-2 h-5 w-5" /> Submit Action Plan
        </Button>
      </CardFooter>
    </Card>
  );
}