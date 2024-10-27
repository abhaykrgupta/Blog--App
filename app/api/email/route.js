import ConnectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModels";
import { NextResponse } from "next/server";

// Load database connection
const LoadDb = async () => {
    await ConnectDB();
};

LoadDb();

export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: 'Email Subscribed' });
}

export async function GET(_request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
}

// Delete email endpoint
export async function DELETE(request) {
    // Correct the typo here
    const id = request.nextUrl.searchParams.get("id"); // Use "id" string for parameter name
    if (!id) {
        return NextResponse.json({ success: false, msg: "ID not provided" }, { status: 400 });
    }

    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
}


