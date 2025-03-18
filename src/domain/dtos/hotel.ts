import { z } from "zod"

// DTO => Domain Transfer Object

export const CreateHotelDTO = z.object({
    name: z.string(),
    location: z.string(),
    image: z.string(),
    price: z.string(),
    description: z.string()
});