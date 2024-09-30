import * as zod from 'zod'

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export const userAddress = zod.object({
    name: zod.string().min(1, "Name cannot be empty"),
    number: zod.number().min(10).max(10, "Contact number must be of 10 digits"),
    pincode: zod.string(),
    locality: zod.string().min(1, "Locality cannot be empty"),
    address: zod.string().min(1, "address cannot be empty"),
    city: zod.string().min(1, "city cannot be blank"),
    state: zod.enum(indianStates as [string, ...string[]]),
})

