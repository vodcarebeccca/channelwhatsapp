export interface ChannelData {
  name: string;
  description: string;
  image: string;
  destinationLink: string;
  verified: boolean;
}

export interface ChannelContextType {
  data: ChannelData;
  updateData: (newData: Partial<ChannelData>) => void;
}
