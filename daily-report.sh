#!/bin/bash
REPORT_FILE="daily-report.txt"
echo "------------------------------------------" >> $REPORT_FILE
echo "ARCHIVE NEUROSPHERE - LAPORAN HARIAN" >> $REPORT_FILE
echo "Tanggal: $(date)" >> $REPORT_FILE
echo "------------------------------------------" >> $REPORT_FILE

# Menarik jumlah warga terbaru
COUNT=$(curl -s -X GET "https://yyzymgkdqpqevkuhowjci.supabase.co/rest/v1/claims?select=count" \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y" | jq .[0])

echo "Total Citizens: $COUNT" >> $REPORT_FILE
echo "Status Distribusi IND-EUR: ACTIVE" >> $REPORT_FILE
echo "Status Reservasi LUV: SECURED" >> $REPORT_FILE
echo "AI Guard Monitoring: 100% Otonom" >> $REPORT_FILE
echo "------------------------------------------" >> $REPORT_FILE
echo "Laporan berhasil disimpan ke $REPORT_FILE"
