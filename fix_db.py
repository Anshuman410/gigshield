import sqlite3

try:
    conn = sqlite3.connect(r'c:\Users\hp\OneDrive\Desktop\New folder\gigshield\prisma\dev.db')
    c = conn.cursor()
    try:
        c.execute('ALTER TABLE "Claim" ADD COLUMN "description" TEXT')
        print("Added description column")
    except Exception as e:
        print("description column error:", e)

    try:
        c.execute('ALTER TABLE "Claim" ADD COLUMN "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP')
        print("Added createdAt column")
    except Exception as e:
        print("createdAt column error:", e)

    conn.commit()
    conn.close()
    print("Database updated successfully")
except Exception as e:
    print("Connection error:", e)
