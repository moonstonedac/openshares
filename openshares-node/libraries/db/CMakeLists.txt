file(GLOB HEADERS "include/capricorn/db/*.hpp")
add_library( capricorn_db undo_database.cpp index.cpp object_database.cpp ${HEADERS} )
target_link_libraries( capricorn_db fc )
target_include_directories( capricorn_db PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

install( TARGETS
   capricorn_db

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
install( FILES ${HEADERS} DESTINATION "include/capricorn/db" )
